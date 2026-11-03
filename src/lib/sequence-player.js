// Image-sequence player for stepped playback: compressed frames are fetched per segment ahead of a step,
// only a small window around the playhead is decoded, and a missing frame holds the last good one.
export class SequencePlayer {
  constructor({canvas,urlFor,frameCount,stride=1,keep=[],concurrency=4,maxCacheBytes=128*1024*1024,onError=()=>{},onFrame=()=>{}}) {
    this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});
    if(!this.ctx||!Number.isInteger(frameCount)||frameCount<1)throw new Error('Invalid sequence canvas or frame count');
    this.urlFor=urlFor;this.count=frameCount;this.conc=concurrency;this.maxBytes=maxCacheBytes;this.onError=onError;this.onFrame=onFrame;
    this.loadable=new Set([...Array(frameCount).keys()].filter(i=>i%stride===0||keep.includes(i)||i===frameCount-1));
    this.blobs=new Map();this.fetching=new Map();this.waits=new Map();this.queue=[];this.cache=new Map();this.decoding=new Map();this.failed=new Set();
    this.current=0;this.displayed=-1;this.direction=1;this.ahead=12;this.behind=3;this.closed=false;
    this.fit={x:0,y:0,w:1,h:1};this.resize=this.resize.bind(this);addEventListener('resize',this.resize);this.resize();
  }
  async init() {
    this.enqueue([0],true);await this.when(0);await this.decode(0);if(!this.cache.has(0))throw new Error('Opening frame unavailable');this.draw(0);
  }
  resize(){const dpr=Math.min(globalThis.devicePixelRatio||1,2);this.cssWidth=Math.max(1,this.canvas.clientWidth);const w=Math.round(this.cssWidth*dpr),h=Math.max(1,Math.round(this.canvas.clientHeight*dpr));if(this.canvas.width!==w)this.canvas.width=w;if(this.canvas.height!==h)this.canvas.height=h;this.draw(this.current);}
  // Loadable frames from a to b (inclusive) in playback order.
  range(a,b){const out=[],d=b>=a?1:-1;for(let i=a;i!==b+d;i+=d)if(this.loadable.has(i))out.push(i);return out;}
  when(i){if(this.blobs.has(i)||this.failed.has(i)||!this.loadable.has(i))return Promise.resolve();if(!this.waits.has(i)){let resolve;const promise=new Promise(r=>{resolve=r;});this.waits.set(i,{promise,resolve});}return this.waits.get(i).promise;}
  enqueue(list,front=false){
    const fresh=list.filter(i=>!this.blobs.has(i)&&!this.fetching.has(i)&&!this.failed.has(i)&&this.loadable.has(i));
    this.queue=front?[...fresh,...this.queue.filter(i=>!fresh.includes(i))]:[...this.queue,...fresh.filter(i=>!this.queue.includes(i))];this.pump();
  }
  pump(){
    while(!this.closed&&this.fetching.size<this.conc&&this.queue.length){
      const i=this.queue.shift(),ac=new AbortController();this.fetching.set(i,ac);
      fetch(this.urlFor(i),{signal:ac.signal,mode:'same-origin'}).then(r=>{if(!r.ok)throw new Error(`Frame ${i}: HTTP ${r.status}`);return r.blob();})
        .then(blob=>{if(!this.closed)this.blobs.set(i,blob);})
        .catch(error=>{if(!this.closed&&error.name!=='AbortError'){this.failed.add(i);this.onError(error);}})
        .finally(()=>{this.fetching.delete(i);this.waits.get(i)?.resolve();this.waits.delete(i);this.pump();this.schedule();});
    }
  }
  // Fetch the segment a→b first in line and decode its opening frames; resolves when playback will not wait on the network.
  async preload(a,b){
    const list=this.range(a,b);if(b!==a)this.direction=Math.sign(b-a);this.enqueue(list,true);
    await Promise.all(list.map(i=>this.when(i)));this.schedule();
    await Promise.all(list.slice(0,this.ahead).map(i=>this.decoding.get(i)));
  }
  prefetch(a,b){this.enqueue(this.range(a,b));}
  decode(i){
    if(this.cache.has(i)||!this.blobs.has(i))return Promise.resolve();if(this.decoding.has(i))return this.decoding.get(i);
    const task=createImageBitmap(this.blobs.get(i)).then(bmp=>{
      // Size the decoded window to the memory budget once the frame size is known.
      const fit=Math.max(2,Math.floor(this.maxBytes/(bmp.width*bmp.height*4)));this.ahead=Math.max(2,Math.floor(fit*.75));this.behind=Math.max(1,fit-this.ahead-1);
      if(this.closed||!this.near(i))bmp.close();else{this.cache.set(i,bmp);if(i!==this.displayed)this.draw(this.current);}
    }).catch(error=>{if(!this.closed){this.failed.add(i);this.onError(error);}}).finally(()=>{this.decoding.delete(i);this.schedule();});
    this.decoding.set(i,task);return task;
  }
  near(i){const d=(i-this.current)*this.direction;return d>=0?d<=this.ahead*2:-d<=this.behind*2;}
  schedule(){
    if(this.closed)return;
    const end=this.direction>0?this.count-1:0,start=this.direction>0?0:this.count-1;
    const wanted=[...this.range(this.current,end).slice(0,this.ahead+1),...this.range(this.current,start).slice(1,this.behind+1)];
    for(const [i,bmp] of this.cache)if(!wanted.includes(i)&&i!==this.displayed){bmp.close();this.cache.delete(i);}
    // A jump (scrollbar, anchor, restored scroll) lands outside any preloaded segment: fetch around the playhead first.
    const missing=wanted.filter(i=>!this.blobs.has(i)&&!this.fetching.has(i)&&!this.failed.has(i));if(missing.length)this.enqueue(missing,true);
    for(const i of wanted){if(this.decoding.size>=this.conc)break;void this.decode(i);}
  }
  setProgress(progress){const i=Math.round(Math.min(1,Math.max(0,progress))*(this.count-1));if(i!==this.current){this.direction=Math.sign(i-this.current);this.current=i;this.schedule();}this.draw(i);return i;}
  draw(i){
    let index=i;
    if(!this.cache.has(i)){index=-1;let distance=Infinity;for(const key of this.cache.keys()){
      // Hold the last image rather than overshoot and jump backward as decoding finishes.
      if(this.direction>0&&(key>i||key<this.displayed))continue;
      if(this.direction<0&&(key<i||key>this.displayed))continue;
      if(Math.abs(key-i)<distance){distance=Math.abs(key-i);index=key;}
    }}
    const bmp=this.cache.get(index);if(!bmp)return;
    const cw=this.canvas.width,ch=this.canvas.height,s=Math.max(cw/bmp.width,ch/bmp.height),w=bmp.width*s,h=bmp.height*s,x=(cw-w)/2,y=(ch-h)/2;
    const dpr=cw/this.cssWidth,fit={x:x/dpr,y:y/dpr,w:w/dpr,h:h/dpr};
    const changed=this.displayed!==index||this.lastWidth!==cw||this.lastHeight!==ch||Object.keys(fit).some(key=>fit[key]!==this.fit[key]);
    if(!changed)return;
    this.ctx.fillStyle='#0A0D14';this.ctx.fillRect(0,0,cw,ch);this.ctx.drawImage(bmp,x,y,w,h);
    this.fit=fit;this.displayed=index;this.lastWidth=cw;this.lastHeight=ch;this.onFrame(index);
  }
  toScreen(x,y){return [this.fit.x+x*this.fit.w,this.fit.y+y*this.fit.h];}
  get stats(){return {requested:this.current,displayed:this.displayed,cached:this.cache.size,fetched:this.blobs.size,pending:this.fetching.size,failed:this.failed.size,decodedBytes:[...this.cache.values()].reduce((n,b)=>n+b.width*b.height*4,0)};}
  destroy(){this.closed=true;removeEventListener('resize',this.resize);for(const ac of this.fetching.values())ac.abort();for(const w of this.waits.values())w.resolve();for(const b of this.cache.values())b.close();this.cache.clear();this.blobs.clear();this.queue=[];}
}

// Bounded decoded-frame cache; prioritizes the requested frame after scroll jumps.
export class SequencePlayer {
  constructor({canvas,urlFor,frameCount,window=12,concurrency=4,maxCacheBytes=128*1024*1024,onError=()=>{},onFrame=()=>{}}) {
    this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});
    if(!this.ctx||!Number.isInteger(frameCount)||frameCount<1)throw new Error('Invalid sequence canvas or frame count');
    this.urlFor=urlFor;this.count=frameCount;this.win=window;this.conc=concurrency;this.maxBytes=maxCacheBytes;this.onError=onError;this.onFrame=onFrame;
    this.cache=new Map();this.pending=new Map();this.failed=new Set();this.current=0;this.displayed=-1;this.direction=1;this.closed=false;
    this.fit={x:0,y:0,w:1,h:1};this.resize=this.resize.bind(this);addEventListener('resize',this.resize);this.resize();
  }
  async init(onProgress=()=>{}) {
    const first=Math.min(this.count,6);let done=0;
    await this.load(0);if(!this.cache.has(0))throw new Error('Opening frame unavailable');this.draw(0);
    for(let start=1;start<first;start+=this.conc)await Promise.all(Array.from({length:Math.min(this.conc,first-start)},(_,j)=>this.load(start+j).then(()=>onProgress(++done/(first-1)))));
    this.schedule();
  }
  resize(){const dpr=Math.min(globalThis.devicePixelRatio||1,2),w=Math.max(1,Math.round(this.canvas.clientWidth*dpr)),h=Math.max(1,Math.round(this.canvas.clientHeight*dpr));if(this.canvas.width!==w)this.canvas.width=w;if(this.canvas.height!==h)this.canvas.height=h;this.draw(this.current);}
  load(i) {
    if(this.closed||this.cache.has(i)||i<0||i>=this.count||this.failed.has(i))return Promise.resolve();
    if(this.pending.has(i))return this.pending.get(i).promise;
    const ac=new AbortController();const task={ac,promise:null};this.pending.set(i,task);
    task.promise=(async()=>{
      try {
        const response=await fetch(this.urlFor(i),{signal:ac.signal,mode:'same-origin'});if(!response.ok)throw new Error(`Frame ${i}: HTTP ${response.status}`);
        const blob=await response.blob();
        if(this.closed||ac.signal.aborted)return;
        const bmp=await createImageBitmap(blob);
        this.win=Math.min(this.win,Math.max(0,Math.floor((Math.floor(this.maxBytes/(bmp.width*bmp.height*4))-1)/2)));
        if(this.closed||ac.signal.aborted||Math.abs(i-this.current)>this.win*1.5)bmp.close();else this.cache.set(i,bmp);
      }catch(error){if(!this.closed&&!ac.signal.aborted&&error.name!=='AbortError'){this.failed.add(i);this.onError(error);}}
      finally{if(this.pending.get(i)===task)this.pending.delete(i);}
    })();return task.promise;
  }
  schedule(){
    if(this.closed)return;
    for(const [i,task] of this.pending)if(Math.abs(i-this.current)>this.win*1.5)task.ac.abort();
    for(const [i,bmp] of this.cache)if(Math.abs(i-this.current)>this.win){bmp.close();this.cache.delete(i);}
    const wanted=[];
    for(let d=0;d<=this.win;d++)for(const i of d?[this.current+d*this.direction,this.current-d*this.direction]:[this.current])if(i>=0&&i<this.count&&!this.cache.has(i)&&!this.pending.has(i)&&!this.failed.has(i))wanted.push(i);
    for(const i of wanted.slice(0,Math.max(0,this.conc-this.pending.size)))void this.load(i).then(()=>{this.draw(this.current);this.schedule();});
  }
  setProgress(progress){const i=Math.round(Math.min(1,Math.max(0,progress))*(this.count-1));if(i!==this.current){this.direction=Math.sign(i-this.current);this.current=i;this.schedule();}this.draw(i);return i;}
  draw(i){
    let index=i;
    if(!this.cache.has(i)){let distance=Infinity;for(const key of this.cache.keys()){
      // Hold the last image rather than overshoot and jump backward as decoding finishes.
      if(this.direction>0&&(key>i||key<this.displayed))continue;
      if(this.direction<0&&(key<i||key>this.displayed))continue;
      if(Math.abs(key-i)<distance){distance=Math.abs(key-i);index=key;}
    }}
    const bmp=this.cache.get(index);if(!bmp)return;
    const cw=this.canvas.width,ch=this.canvas.height,s=Math.max(cw/bmp.width,ch/bmp.height),w=bmp.width*s,h=bmp.height*s,x=(cw-w)/2,y=(ch-h)/2;
    const dpr=cw/Math.max(1,this.canvas.clientWidth),fit={x:x/dpr,y:y/dpr,w:w/dpr,h:h/dpr};
    const changed=this.displayed!==index||this.lastWidth!==cw||this.lastHeight!==ch||Object.keys(fit).some(key=>fit[key]!==this.fit[key]);
    if(!changed)return;
    this.ctx.fillStyle='#0A0D14';this.ctx.fillRect(0,0,cw,ch);this.ctx.drawImage(bmp,x,y,w,h);
    this.fit=fit;this.displayed=index;this.lastWidth=cw;this.lastHeight=ch;this.onFrame(index);
  }
  toScreen(x,y){return [this.fit.x+x*this.fit.w,this.fit.y+y*this.fit.h];}
  get stats(){return {requested:this.current,displayed:this.displayed,cached:this.cache.size,pending:this.pending.size,failed:this.failed.size,decodedBytes:[...this.cache.values()].reduce((n,b)=>n+b.width*b.height*4,0)};}
  destroy(){this.closed=true;removeEventListener('resize',this.resize);for(const t of this.pending.values())t.ac.abort();for(const b of this.cache.values())b.close();this.cache.clear();}
}

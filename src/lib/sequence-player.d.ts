export class SequencePlayer {
 constructor(options:{canvas:HTMLCanvasElement;urlFor:(i:number)=>string;frameCount:number;stride?:number;keep?:number[];concurrency?:number;maxCacheBytes?:number;onError?:(error:Error)=>void;onFrame?:(frame:number)=>void});
 init():Promise<void>;
 preload(from:number,to:number):Promise<void>;
 prefetch(from:number,to:number):void;
 setProgress(progress:number):number;
 toScreen(x:number,y:number):[number,number];
 readonly stats:{requested:number;displayed:number;cached:number;fetched:number;pending:number;failed:number;decodedBytes:number};
 destroy():void;
}

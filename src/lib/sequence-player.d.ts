export class SequencePlayer {
 constructor(options:{canvas:HTMLCanvasElement;urlFor:(i:number)=>string;frameCount:number;window?:number;concurrency?:number;maxCacheBytes?:number;onError?:(error:Error)=>void;onFrame?:(frame:number)=>void});
 init(onProgress?:(p:number)=>void):Promise<void>;
 setProgress(progress:number):number;
 toScreen(x:number,y:number):[number,number];
 readonly stats:{requested:number;displayed:number;cached:number;pending:number;failed:number;decodedBytes:number};
 destroy():void;
}

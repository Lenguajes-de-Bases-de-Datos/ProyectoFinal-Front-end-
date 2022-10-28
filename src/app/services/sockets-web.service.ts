import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SocketsWebService extends Socket{
  array:any[] = []
  callback:EventEmitter<any> = new EventEmitter();
  receive:EventEmitter<any> = new EventEmitter();
  constructor() { 
    super({
      url:"http://localhost:3000",
      options:{
        transports: ["websocket"] 
      }
    });
    this.ioSocket.on("messages",(res:any)=>{this.array = res; this.callback.emit(res)});
    this.ioSocket.on("notification",(res:any)=>{this.receive.emit(res)});
      this.getArray();
  }
  emitEvent = (payload = {})=>{
    this.ioSocket.emit('msg',payload);
  }
  
  getArray():any[]{
     return this.array;
    
  }
}

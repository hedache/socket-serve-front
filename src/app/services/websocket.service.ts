import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket
  ) { 
    this.checkStatus();
  }


  // saber cuando se conecta y se desconecta el servidor
    checkStatus() {
      this.socket.on('connect', () => {
        console.log('Conectado al servidor');
        this.socketStatus = true;
      })
      this.socket.on('disconnect', () => {
        console.log('desconectado del servidor');
        this.socketStatus = false;
      })
    }


    emit( evento: string, payload?: any, callback?: Function ) {
      console.log('Emitiendo mensaje');
      this.socket.emit( evento, payload, callback );
    }

    listen( evento:string ) {
      return this.socket.fromEvent( evento );
    }




}

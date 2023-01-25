import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy  {

  texto = '';
  mensajeSubscription!: Subscription;
  elemento!: HTMLElement;

  mensajes: any[] = [];

  constructor(
    private wsChat: ChatService
  ) {}

  ngOnInit(): void {
    // this.elemento = document.getElementById('chat-mensajes')!;
    this.elemento = document.getElementById('chat-mensajes') as HTMLElement;
    this.mensajeSubscription = this.wsChat.getMessage().subscribe( msg => {
      console.log(msg);
      this.mensajes.push( msg );

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });
  }

  ngOnDestroy() {
    this.mensajeSubscription.unsubscribe();
  }

  enviar() {

    if( this.texto.trim().length === 0 ) {
      return;
    }

    this.wsChat.sendMessage(this.texto);
    this.texto = '';
  }

}

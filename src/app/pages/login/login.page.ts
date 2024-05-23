import { Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swiper from 'swiper';
import { SwiperContainer, SwiperSlide } from 'swiper/element';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { UsuarioService } from '../../services/usuario.service';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  name: string = '';
  error: string = '';

  div1Visible: boolean = true;
  buttonDisabled: boolean[] = [true, false];

  avatars = [
    { img: 'av-1.png', seleccionado: true },
    { img: 'av-2.png', seleccionado: false },
    { img: 'av-3.png', seleccionado: false },
    { img: 'av-4.png', seleccionado: false },
    { img: 'av-5.png', seleccionado: false },
    { img: 'av-6.png', seleccionado: false },
    { img: 'av-7.png', seleccionado: false },
    { img: 'av-8.png', seleccionado: false },
  ];

  loginUser = {
    email: '', 
    password: '' 
  };

  registerUser : Usuario = {
    email: '',
    password: '',
    name: '',
    avatar: 'av-1.png'

  };

  constructor(
    private usuarioService: UsuarioService,
    private navcontroller:NavController,
    private uiService: UiServiceService,
    ) {}

    //Hasta aqui
    toggleDivs(divNumber: number) {
      if (divNumber === 1) {
        this.div1Visible = true;
        this.buttonDisabled = [true, false];
      } else {
        this.div1Visible = false;
        this.buttonDisabled = [false, true];
      }
    }
  
    async login( fLogin: NgForm){
      // si login invalid te comes una *****
      if(fLogin.invalid) {return;}
  
      const valido = await this.usuarioService.login(this.loginUser.email,this.loginUser.password)
  
      if (valido) {
        //navegar al tabs
        this.navcontroller.navigateRoot('main/tabs/tab1', {animated: true})
      } else {
        //Mostrar alerta de fallo en login
        this.uiService.alertaInformativa('Usuario o contraseña incorrectos')
      }
  
      console.log(fLogin.valid)
    }
  
  
  
  
    async registro(fRegistro: NgForm){
  
      if( fRegistro.invalid){ return;}
  
      const valido = await this.usuarioService.registro(this.registerUser);
  
      if (valido) {
        //navegar al tabs
        this.navcontroller.navigateRoot('main/tabs/tab1', {animated: true})
      } else {
        //Mostrar alerta de fallo en login
        this.uiService.alertaInformativa('Ese correo electrónico ya está en uso')
      }
  
      this.usuarioService.registro( this.registerUser)
    }
  
    seleccionarAvatar( avatar :any ){
      this.avatars.forEach( av => av.seleccionado = false);
      avatar.seleccionado = true;
    }
  }

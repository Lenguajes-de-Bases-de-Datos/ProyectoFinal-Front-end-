import { Component, OnInit } from '@angular/core';
import { Options } from './options.model';
declare const events : any;
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  band:boolean=false;
  options:any[]=[
    {
      opcion:"Usuarios",
      class:"",

      rutas:[
       {
        ruta:'/sign-up',
        nombre:'Crear'
       },
       { 
        ruta:'/read-users',
        nombre:'Consultar'
       } ,
       {
        ruta:'update-user',
        nombre:'Actualizar'
       }, 
       {
        ruta:'delete-user',
        nombre:'Eliminar'
      }
    ],
      icono:"",
      id:"users"
    },

    {
      opcion:"Categorias",
      class:"",
      rutas:[{
        ruta:'',
        nombre:'Crear'
      },
       { 
        ruta:'',
        nombre:'Consultar'
       } ,
       {
        ruta:'',
        nombre:'Actualizar'
       }, 
       {
        ruta:'',
        nombre:'Eliminar'
      }
    ],
      icono:"",
      id:"categories"
    },
    {
      opcion:"Proveedores",
      class:"",
      rutas:[{
        ruta:'',
        nombre:'Crear'
      },
       { 
        ruta:'',
        nombre:'Consultar'
       } ,
       {
        ruta:'',
        nombre:'Actualizar'
       }, 
       {
        ruta:'',
        nombre:'Eliminar'
      }
    ],
      icono:"",
      id:"providers"
    },
    {
      opcion:"Pedidos",
      class:"",
      rutas:[{
        ruta:'',
        nombre:'Crear'
      },
       { 
        ruta:'',
        nombre:'Consultar'
       } ,
       {
        ruta:'',
        nombre:'Actualizar'
       }, 
       {
        ruta:'',
        nombre:'Eliminar'
      }
    ],
      icono:"",
      id:"orders"
    },
    {
      opcion:"Enviar notificación",
      class:"",
      rutas:[{
        ruta:'/send-msg',
        nombre:'Crear Notificación'
      }
    ],
      icono:"",
      id:"send-msg"
    },

  ];
  constructor() { try {
    let token = sessionStorage.getItem('token') || "";
    let resp = jwt_decode(token);
  } catch(Error) {
    console.log(Error);
  }}

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    events();
  }
  scroll(){
    this.band=true;
   
    window.scrollTo(0,0);
  }
}
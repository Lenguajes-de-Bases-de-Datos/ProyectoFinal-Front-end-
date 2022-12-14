import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { SocketsWebService } from 'src/app/services/sockets-web.service';
import swal from 'sweetalert2';
import jwt_decode from "jwt-decode";
import { RequestsService } from 'src/app/services/requests.service';
declare const events : any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  notifications:any[]=[];
  count:number = 0;
  band_paused:boolean=true;
  name!:any;
  prod:string="";
  valid:boolean=true;
  user:any;
  namesuc:string = "";
  constructor(public request:RequestsService,public socket:SocketsWebService,private router:Router,private auth:AuthGuardService) { 
    this.user = localStorage.getItem('cuenta') || "";
    this.user = JSON.parse(this.user);
    //esta parte verifica si ya se habia usado anteriormente un socket
    //en caso de que si, solo vuelve a establecer una nueva conección
    //y en caso de que no, no realiza nada ya que, el constructor del
    //servicio socket con el constructor la realiza, este caso aplicaria
    //solo la primera vez que se invoca al servicio...
    if(!this.socket.isFirst){
      this.socket.conneccion();
    }
    if(this.user!=undefined){
      
      this.name = this.user.nombre+" "+this.user.appat+" "+this.user.apmat;
    }
    setTimeout(()=>{
      this.band_paused=false;
    },4000);
    
   socket.callback.subscribe((res:any)=>{
     this.notifications=res;
     this.count = this.notifications.length;
    setTimeout(()=>{
      this.band_paused=false;
    },4000);
    });
  socket.receive.subscribe((res:any)=>{
    this.band_paused=true;
    setTimeout(()=>{
      this.band_paused=false;
    },4000);
    
    this.notifications.push(res);
    this.count++;
    });



    try {
      let token = sessionStorage.getItem('token') || "";
      let resp = jwt_decode(token);
      console.log(resp);
    } catch(Error) {
      
    }

    this.request.consultas(`SELECT concat(u.estado,' ',u.ciudad,' ',u.colonia,' ',s.calle,' ',s.numero) ub FROM sucursal s,ubicacion u WHERE s.id_ubicacion=u.id and s.id=${this.user.ID_sucursal}`)
    .subscribe((res:any)=>{
      this.namesuc = res[0].ub;
    });
  }
  buscar(){
    if(this.prod=="" || this.prod.match('[\'\"|&]+')){
      swal.fire({
        backdrop: true, 
        allowOutsideClick: true,
        title: "Texto incorrecto...",
        text: "No se permiten caracteres como \", ', |,etc...",
        confirmButtonText:'Entendido'
      });
    }else{
      this.router.navigate(['one-producto',this.prod]);
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    events();
  }
  logOut(){
    localStorage.removeItem('cuenta');
    sessionStorage.removeItem('token');
    this.auth.band = true;
    this.router.navigate(['/portal']);
    this.socket.logOut();
  }
  //Actualiza el contador de la bubble que indica el número de notificaciones...
  //una vez que se da clic sobre una notificacion se decrementa el contador.
  updateCount(i:number){
    
    
  }
  seen(){
    this.count= 0;
  }
  grafica(){
    this.router.navigate(['/grafica-genero']);
  }
  grafica2(){
    this.router.navigate(['/grafica-ventas']);
  }
}

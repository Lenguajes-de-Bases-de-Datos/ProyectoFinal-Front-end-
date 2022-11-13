import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginacionComponent } from 'src/app/home/paginacion/paginacion.component';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-read-compra',
  templateUrl: './read-compra.component.html',
  styleUrls: ['./read-compra.component.css']
})
export class ReadCompraComponent implements OnInit {
  compras:any[]=[];
  sql:string="SELECT c.id id,concat(u.id,' ',u.nombre,' ',u.appat,' ',apmat) usuario,c.id_sucursal suc,c.id_prov prov,c.total tot,c.fecha fecha,c.observaciones obs FROM compra c,usuario u WHERE c.id_usuario=u.id";
  total:number=0;
  form!:FormGroup;
  option:string="";
  band!:boolean;
  user!:any;
  @ViewChild('pag') element?:PaginacionComponent;
  constructor(private request:RequestsService) { 
    this.user = localStorage.getItem('cuenta') || "";
    let sqltot = "";
    this.user = JSON.parse(this.user);
    console.log("user: "+this.user);
    if(this.user.privilegios != "superadmin"){
      this.sql = `SELECT c.id id,concat(u.id,' ',u.nombre,' ',u.appat,' ',apmat) usuario,u.id_sucursal suc,c.id_prov prov,c.total tot,c.fecha fecha,c.observaciones obs FROM compra c,usuario u WHERE c.id_usuario=u.id and u.ID_sucursal=${this.user.ID_sucursal}`;
      sqltot = `select sum(c.total) total from compra c,usuario u WHERE c.ID_usuario=u.id and u.ID_sucursal=${this.user.ID_sucursal} GROUP BY u.ID_sucursal`;
      this.band = false;
    }else{
      this.sql = "SELECT c.id id,concat(u.id,' ',u.nombre,' ',u.appat,' ',apmat) usuario,u.id_sucursal suc,c.id_prov prov,c.total tot,c.fecha fecha,c.observaciones obs FROM compra c,usuario u WHERE c.id_usuario=u.id";
      this.band = true;
      //pendientesqltot = `select sum(total) total from compra WHERE ID_sucursal=${this.user.ID_sucursal} GROUP BY ID_sucursal`;
      
    }
    this.request.consultas(this.sql+' LIMIT 0,11').subscribe((res:any)=>{
      this.compras = res;
    });
    this.request.consultas(sqltot).subscribe((res:any)=>{
      this.total = res[0].total;
    });

    this.form = new FormGroup({
      fecha : new FormControl('',[Validators.required]),
      fechaini : new FormControl('',[Validators.required]),
      fechafin : new FormControl('',[Validators.required]),
      nombre : new FormControl('',[Validators.required,Validators.pattern('[^|!&\'\"]+')]),
      sucursal : new FormControl('',[Validators.required,Validators.pattern('[0-9]+')])
    });



   }
   buscar(){
    let sqltot="";
    if(this.option == "2"){
      this.sql = "SELECT c.id id,concat(u.id,' ',u.nombre,' ',u.appat,' ',apmat) usuario,u.id_sucursal suc,c.id_prov prov,c.total tot,c.fecha fecha,c.observaciones obs"; 
      this.sql+=` FROM compra c,usuario u WHERE c.id_usuario=u.id and c.fecha = '${this.form.get('fecha')?.value}'`;
      sqltot = `select sum(c.total) total from compra c,usuario u WHERE c.ID_usuario=u.id and u.ID_sucursal=${this.user.ID_sucursal} and c.fecha='${this.form.get('fecha')?.value}' GROUP BY u.ID_sucursal`;
    }else if(this.option == "3"){
      this.sql = "SELECT c.id id,concat(u.id,' ',u.nombre,' ',u.appat,' ',apmat) usuario,u.id_sucursal suc,c.id_prov prov,c.total tot,c.fecha fecha,c.observaciones obs"; 
      this.sql+=` FROM compra c,usuario u WHERE c.id_usuario=u.id and c.fecha BETWEEN '${this.form.get('fechaini')?.value}' and '${this.form.get('fechafin')?.value}'`;
      sqltot = `select sum(c.total) total from compra c,usuario u WHERE c.ID_usuario=u.id and u.ID_sucursal=${this.user.ID_sucursal} and c.fecha BETWEEN '${this.form.get('fechaini')?.value}' and '${this.form.get('fechafin')?.value}' GROUP BY u.ID_sucursal`;
    
    }else if(this.option == "4"){
      this.sql = "SELECT c.id id,concat(u.id,' ',u.nombre,' ',u.appat,' ',apmat) usuario,u.id_sucursal suc,c.id_prov prov,c.total tot,c.fecha fecha,c.observaciones obs"; 
      this.sql+=` FROM compra c,usuario u WHERE c.id_usuario=u.id and concat(u.nombre,u.appat,u.apmat) LIKE '%${this.form.get('nombre')?.value}%'`;
      sqltot = `select sum(c.total) total from compra c,usuario u WHERE c.ID_usuario=u.id and u.ID_sucursal=${this.user.ID_sucursal} and u.nombre LIKE '%${this.form.get('nombre')?.value}%' GROUP BY u.ID_sucursal`;
    
    }else if(this.option == "5"){
      this.sql = "SELECT c.id id,concat(u.id,' ',u.nombre,' ',u.appat,' ',apmat) usuario,u.id_sucursal suc,c.id_prov prov,c.total tot,c.fecha fecha,c.observaciones obs"; 
      this.sql+=` FROM compra c,usuario u WHERE c.id_usuario=u.id and c.ID_sucursal = ${this.form.get('sucursal')?.value}`;
      //sqltot = `select sum(c.total) total from compra c,usuario u WHERE u.ID_sucursal=${this.form.get('sucursal')?.value} GROUP BY u.ID_sucursal`;
    
    }else if(this.option == "1"){
      this.sql = "SELECT c.id id,concat(u.id,' ',u.nombre,' ',u.appat,' ',apmat) usuario,u.id_sucursal suc,c.id_prov prov,c.total tot,c.fecha fecha,c.observaciones obs FROM compra c,usuario u WHERE c.id_usuario=u.id";
  
    }else{

    }
    if(this.band){
      //pendientesqltot
    }else{
      this.sql += ` and u.ID_sucursal=${this.user.ID_sucursal}`;
    }
    setTimeout(()=>{
      this.element?.reinicia();
    
    },200);
    this.request.consultas(sqltot).subscribe((res:any)=>{
      this.total = res[0].total;
    });
   }
   change(){
    if(this.option == "2"){
      this.form.controls['fecha'].setValue('');
      this.form.controls['fechaini'].setValue('2000-11-02');
      this.form.controls['fechafin'].setValue('2000-11-02');
      this.form.controls['nombre'].setValue('ddsaad');
      this.form.controls['sucursal'].setValue('1');
    }else if(this.option == "3"){
      this.form.controls['fechaini'].setValue('');
      this.form.controls['fechafin'].setValue('');
      this.form.controls['fecha'].setValue('2000-11-02');
      this.form.controls['nombre'].setValue('ddsaad');
      this.form.controls['sucursal'].setValue('1');
    

    }else if(this.option == "4"){
      this.form.controls['nombre'].setValue('');
      this.form.controls['fecha'].setValue('2000-11-02');
      this.form.controls['fechaini'].setValue('2000-11-02');
      this.form.controls['fechafin'].setValue('2000-11-02');
      this.form.controls['sucursal'].setValue('1');
    
    }else if(this.option == "5"){
      this.form.controls['sucursal'].setValue('');
      this.form.controls['fecha'].setValue('2000-11-02');
      this.form.controls['fechaini'].setValue('2000-11-02');
      this.form.controls['fechafin'].setValue('2000-11-02');
      this.form.controls['nombre'].setValue('ddsaad'); 
    }else if(this.option == "1"){
      this.form.controls['sucursal'].setValue('1');
      this.form.controls['fecha'].setValue('2000-11-02');
      this.form.controls['fechaini'].setValue('2000-11-02');
      this.form.controls['fechafin'].setValue('2000-11-02');
      this.form.controls['nombre'].setValue('ddsaad'); 
    
    }else{
      this.form.reset();
    }
   }
  ngOnInit(): void {
  }
  result(res:any){
    this.compras = res;
  }
}

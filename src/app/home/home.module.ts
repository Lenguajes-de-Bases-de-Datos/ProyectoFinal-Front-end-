import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal/portal.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultComponent } from './default/default.component';

@NgModule({
  declarations: [
    PortalComponent,
    LoginComponent,
    NavbarComponent,
    ProductosComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NavbarComponent,
    LoginComponent
  ]
})
export class HomeModule { }
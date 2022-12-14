import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSucursalComponent } from './componentes/create-sucursal/create-sucursal.component';
import { ReadSucursalComponent } from './componentes/read-sucursal/read-sucursal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from 'src/app/home/home.module';



@NgModule({
  declarations: [
    CreateSucursalComponent,
    ReadSucursalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule
  ]
})
export class CrudSucursalModule { }

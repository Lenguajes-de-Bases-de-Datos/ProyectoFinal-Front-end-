import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserComponent } from './componentes/crud-users/create-user/create-user.component';
import { DeleteUserComponent } from './componentes/crud-users/delete-user/delete-user.component';
import { UpdateUserComponent } from './componentes/crud-users/update-user/update-user.component';
import { ReadUserComponent } from './componentes/crud-users/read-user/read-user.component';

import { HomeModule } from 'src/app/home/home.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateUserComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    ReadUserComponent
  ],
  imports: [
    CommonModule,

    HomeModule, ReactiveFormsModule,
    FormsModule
  ]
})
export class CrudUserModule { }

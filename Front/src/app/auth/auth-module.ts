import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { Register } from './register/register';
import { Login } from './login/login';
import { Auth } from '../services/auth';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
    Register,
    Login,
  ],
  providers: [Auth],
})
export class AuthModule {}

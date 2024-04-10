import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { RouterModule, provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import {routes} from '../../../app.routes';



@Component({
  selector: 'login-page',
  standalone: true,
  imports: [CommonModule, MaterialModule,RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  ingresa = signal(true);
  rutas = provideRouter;
  login(){
    if(this.ingresa()){
     // this.rutas.navigate(['/parent/detail']);
    }
  }
}

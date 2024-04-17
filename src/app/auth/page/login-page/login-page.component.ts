import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Router, RouterModule, provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from '../../../app.routes';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'login-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  ingresa = signal(true);
  private service = inject(AuthService);
  private rutas = inject(Router)

  login() {
    this.service.login('a', 'b')
      .subscribe(user => {
        console.log({ user })
        this.rutas.navigate(['/heroes']);
      });
  }


}

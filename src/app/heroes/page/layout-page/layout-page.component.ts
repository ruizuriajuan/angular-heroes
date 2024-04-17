import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

interface SidebarItems {
  label: string,
  icon: string,
  url: string
}

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export default class LayoutPageComponent {
  private authService = inject(AuthService);
  private rutas = inject(Router);

  sidebarItems: SidebarItems[] = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './add' },
    { label: 'Buscar', icon: 'search', url: './search' }
  ]

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  logout() {
    this.authService.logout();
    this.rutas.navigate(['/auth']);
  }
}

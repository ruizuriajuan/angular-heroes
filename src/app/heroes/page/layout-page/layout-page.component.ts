import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';

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
  sidebarItems: SidebarItems[] = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './add' },
    { label: 'Buscar', icon: 'search', url: './search' }
  ]
}

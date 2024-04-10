import { Component, Inject, OnInit, inject } from '@angular/core';
import { HeroService } from '../../services/hero.service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { MaterialModule } from '../../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeroImagePipe } from '../../pipes/hero-image.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [CommonModule,RouterModule, MaterialModule,HeroImagePipe],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent {
  
  private heroService = inject(HeroService);
  private activetedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(
    public dialogRef: MatDialogRef<HeroPageComponent>,
    @Inject(MAT_DIALOG_DATA) public hero: Hero,
  ) { 
    console.log('Aca: ',hero);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /*
  ngOnInit(): void {
    this.activetedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroService.getHero(id))
      ).subscribe(hero => {
        if (!hero) return this.router.navigateByUrl('heroes/list');
        console.log(hero);
        return this.hero = hero;
      })
  }*/




}

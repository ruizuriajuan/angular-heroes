import { Component, Input, OnInit, inject } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroImagePipe } from "../../pipes/hero-image.pipe";
import { MatDialog } from '@angular/material/dialog';
import { HeroPageComponent } from '../../page/hero-page/hero-page.component';

@Component({
    selector: 'hero-card',
    standalone: true,
    templateUrl: './card.component.html',
    styles: ``,
    imports: [CommonModule, MaterialModule, RouterModule, HeroImagePipe]
})
export class CardComponent implements OnInit {
  public dialog = inject(MatDialog);
  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if (!this.hero) throw new Error('Hero property is required');
  }

  openModalInfo(){
    const modal = this.dialog.open(HeroPageComponent,{
      height: '70%',
      width: '50%',
      data: this.hero
    });

    modal.afterClosed().subscribe( result=>{
      console.log('Modal cerrado');
      
    })
  }

}

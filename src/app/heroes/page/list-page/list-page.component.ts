import { Component, OnInit, inject } from '@angular/core';
import { HeroService } from '../../services/hero.service.service';
import { pipe } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { MaterialModule } from '../../../material.module';
import { CardComponent } from '../../components/card/card.component';
import { SearchPageComponent } from '../search-page/search-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, CardComponent, SearchPageComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {
  private service = inject(HeroService);
  public heroes: Hero[] = [];

  ngOnInit(): void {
    this.service.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }

 
  searchHeroes(heroe: Hero) {
    console.log('searchHeroes...',heroe);
    this.service.search(heroe.superhero)
      .subscribe(heroes => {
        this.heroes = heroes
      });
  }

  searchByText(text: string) {
    console.log('searchByText...',text);
    this.service.search(text)
      .subscribe(heroes => {
        this.heroes = heroes
      });
  }


}

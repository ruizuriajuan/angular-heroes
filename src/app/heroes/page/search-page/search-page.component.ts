import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'search-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  service = inject(HeroService);
  searchInput = new FormControl('');
  public heroes: Hero[] = [];
  @Output()
  public selectedHero = new EventEmitter<Hero>();
  @Output()
  public buscarHero = new EventEmitter<string>();

  searchHero() {
    const searchValue: string = this.searchInput.value || '';
    this.buscarHero.emit(searchValue);
    this.service.search(searchValue)
    .subscribe(heroes => {
      this.heroes = heroes
    });
  }

  seleccionado(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) return;
    const heroe:Hero = event.option.value;
    this.searchInput.setValue(heroe.superhero);
    this.selectedHero.emit(heroe);
  }
}

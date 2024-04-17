import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, filter, map, of, tap } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHero(id: string): Observable<Hero | undefined> {   
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      )
  }

  search(query: string): Observable<Hero[]> {
    //return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6 `)
    console.log('query:', query);
    return this.getHeroes()
      .pipe(
        map(heroes => heroes.filter(({ superhero }) => superhero.toUpperCase().includes(query.toUpperCase()))),
        tap(heroes => console.log(heroes)),
      )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero is required')
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${ hero.id }`, hero );
  }

  deleteHero(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map(resp => true),
        catchError(err => of(false))
      );
  }

}

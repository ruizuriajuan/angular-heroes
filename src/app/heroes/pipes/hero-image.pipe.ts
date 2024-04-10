import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage',
  standalone: true
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    if (!hero.id) {
      return 'assets/no-image.png';
    }
    return `assets/heroes/${hero.id}.jpg`;
  }
}

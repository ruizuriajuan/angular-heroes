import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroImagePipe } from '../../pipes/hero-image.pipe';
import { HeroService } from '../../services/hero.service.service';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { dialogConfirm } from '../../interfaces/dialog.interface';

@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, HeroImagePipe],
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit {

  private service = inject(HeroService);
  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public publishers = [
    { id: Publisher.DCComics, desc: 'DC - Comics' },
    { id: Publisher.MarvelComics, desc: 'Marvel - Comics' },
  ];

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.service.getHero(id)),
      ).subscribe(hero => {
        if (!hero) return this.router.navigateByUrl('/');
        return this.heroForm.reset(hero);
      })
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit() {
    console.log({ formisvalid: this.heroForm.valid, value: this.heroForm.value });
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.service.updateHero(this.currentHero)
        .subscribe(hero => {
          this.openSnackBar(`${hero.superhero}`, 'Actualizado');
        });
      return;
    } else {
      this.service.addHero(this.currentHero)
        .subscribe(hero => {
          this.router.navigateByUrl('heroes/list');
          this.openSnackBar(`${hero.superhero}`, 'Creado');
        });
      return;
    }
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero is required');
    let dataConfirm: dialogConfirm = {
      title: 'Eliminacion de Heroe',
      body: `Esta seguro de eliminar al super heroe : ${this.currentHero.superhero}`
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dataConfirm,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result) => result === true), //quiere borrar
        switchMap(() => this.service.deleteHero(this.currentHero.id)),
        filter((wasDeleted) => wasDeleted === true), //fue borrado
      ).subscribe( () => this.router.navigateByUrl('heroes/list'))

    /*dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed, result:', result);
      if (!result) return;
      this.service.deleteHero(this.currentHero.id)
        .subscribe(borrado => {
          console.log({ borrado });

          if (borrado) {
            this.router.navigateByUrl('heroes/list');
          }
        })
    });*/


  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2500 });
  }

}

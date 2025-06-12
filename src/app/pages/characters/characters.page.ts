import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonItem, IonLabel, IonAvatar, IonIcon } from '@ionic/angular/standalone';
import { RickandmortyService } from 'src/app/services/rickandmorty.service';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { RouterModule } from '@angular/router';

interface CharactersResponse{
  info: {
    pages: number;
  };
  results: any[];
}

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [ IonAvatar, IonLabel, IonItem, IonList, IonInfiniteScrollContent, IonInfiniteScroll, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})

export class CharactersPage implements OnInit {
  private api = inject(RickandmortyService);
  characters: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  constructor() { }

  ngOnInit() {

    this.loadCharacters();

  }
  loadCharacters(event?: any) {
    this.api.getCharacterByPage(this.currentPage).subscribe({
      next: (res: CharactersResponse) => {
        this.characters = [...this.characters, ...res.results];
        this.totalPages = res.info.pages;
        if (event) {
          event.target.complete();
        }
      },
      error: (err) => {
        console.error('Erro:', err);
        if (event) {
          event.target.complete();
        }
      }
    });
  }
  loadData(event: any){
    this.currentPage++;
    if (this.currentPage <= this.totalPages) {
      this.loadCharacters(event);
    } else {
      event.target.disabled = true; // Disable the infinite scroll if no more pages
      event.target.complete();
    }
  }

}

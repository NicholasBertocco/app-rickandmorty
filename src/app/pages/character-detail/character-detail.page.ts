import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardSubtitle, IonCardContent, IonCardHeader, IonCardTitle, IonCard, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { RickandmortyService } from 'src/app/services/rickandmorty.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CharacterDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(RickandmortyService);
  character:any;


  constructor(private router: Router) { }
  goBack(){
    this.router.navigate(['/']);
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.getCharacterById(id).subscribe({
      next: (res) => this.character = res,
      error: (err) => console.error('Erro:', err)})
  }

}

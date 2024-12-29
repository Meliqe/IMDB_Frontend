import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {FilmService} from '../../services/film.service';

@Component({
  selector: 'app-actor-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent {
  actorDetails: any;
  PathPrefix: string = 'data:image/jpeg;base64,';

  constructor(private filmService: FilmService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getActorDetails();
  }

  // Oyuncu bilgilerini state üzerinden alan fonksiyon
  getActorDetails(): void {
    const actorDetails=history.state.actorDetails;
    if(actorDetails){
      this.actorDetails = actorDetails;
      this.actorDetails.photoPath = `${this.PathPrefix}${this.actorDetails.photoPath}`;
    }
  }
}

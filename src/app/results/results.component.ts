import { Component } from '@angular/core';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [SpotifyService]
})
export class ResultsComponent {
  constructor(private spotifyService: SpotifyService) { }

}

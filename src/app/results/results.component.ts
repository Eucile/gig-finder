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

  getArtists() {
    this.spotifyService.getToken().subscribe(res => {
      this.spotifyService.searchMusic(res.access_token).subscribe(res => {
        console.log(res);
      })
    })
  }
}

import { Component } from '@angular/core';
import { ConcertService } from '../concert.service';
import { SpotifyService } from '../spotify.service';
import { Result } from '../models/result.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ConcertService, SpotifyService]
})

export class SearchComponent  {

  location: string;
  artist: string;
  startDate: string;
  endDate: string;
  dateRange: string;
  artistsList: Result[] = [];
  albumIDs: string[] = [];

  constructor(private concertService: ConcertService, private spotifyService: SpotifyService, private sanitizer: DomSanitizer) {}

  private showSearch = true;
  private showSpin = false;
  private showRewind = false;

  public getSanitzedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

exit() {
  window.location.reload();
}

  getConcerts() {
    this.showRewind = true;

    this.location =(<HTMLInputElement> document.getElementById('locationSearch')).value;
    this.artist =(<HTMLInputElement> document.getElementById('artistSearch')).value;
    this.startDate = (<HTMLInputElement> document.getElementById('startDate')).value;
    this.endDate = (<HTMLInputElement> document.getElementById('endDate')).value;

    if(this.startDate != "") {
    this.startDate = this.startDate + "T10:00:00Z";
    console.log(this.startDate);
  }
   if(this.endDate != "") {
    this.endDate = this.endDate + "T10:00:00Z";
    console.log(this.endDate);
  }
  
    const test = this.concertService.onClickMe(this.location, this.artist, this.startDate, this.endDate);

    test.then(response => {
      this.showSpin = false;
      let body = JSON.parse(response.toString());

      body._embedded.events.forEach((events, i) => {

        this.artistsList.push(
          new Result(events.name, events._embedded.venues[0].name, events._embedded.venues[0].address.line1, events._embedded.venues[0].city.name, events._embedded.venues[0].state.stateCode, events._embedded.attractions[0].name, events.dates.start.localDate, "", false, events.url)
        );

        this.spotifyService.getToken().subscribe(tokenOne => {
          this.spotifyService.searchMusic(tokenOne.access_token, events._embedded.attractions[0].name).subscribe(artistInfo => {
            if (artistInfo.artists.items[0] != undefined) {
              this.spotifyService.getToken().subscribe(tokenTwo => {
                this.spotifyService.searchAlbum(tokenTwo.access_token, artistInfo.artists.items[0].id).subscribe(artistID => {

                  if(this.artistsList) {
                    this.artistsList[i].exist = true;
                    this.artistsList[i].albumId = "https://open.spotify.com/embed/album/" + artistID.items[0].id;
                  } else {
                    this.artistsList[i].exist = false;
                  }
                });
              });
            } else {
              this.artistsList[i].albumId = 'null';
            }
          });
        });
      })
    }, function(error) {
      console.log(error)
    });
  }
}

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

  public getSanitzedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  getConcerts() {
    this.location =(<HTMLInputElement> document.getElementById('locationSearch')).value;
    this.artist =(<HTMLInputElement> document.getElementById('artistSearch')).value;
    this.startDate = (<HTMLInputElement> document.getElementById('startDate')).value;
    this.endDate = (<HTMLInputElement> document.getElementById('endDate')).value;
    let dateRange;
    if(this.endDate != "" ) {
      this.startDate = this.startDate.split('-').join('');
      this.endDate = this.endDate.split('-').join('');
      if (this.endDate == "") {
        this.dateRange = this.startDate + "00" + "-" + this.startDate + "00";
      } else {
        this.dateRange = this.startDate + "00" + "-" + this.endDate + "00";
      }
    }
    // const test = this.concertService.onClickMe(this.location, this.artist, this.dateRange);

    const test = this.concertService.onClickMe(this.location, this.artist, this.startDate, this.endDate);

    test.then(response => {
      this.showSpin = false;
      let body = JSON.parse(response.toString());

      // body.events.event.forEach((event, i) => {

      body._embedded.events.forEach((events, i) => {

        // this.artistsList.push(
        //   new Result(event.title, event.venue_address, event.city_name, event.region_abbr, event.postal_code, event.start_time)
        // );

        this.artistsList.push(
            new Result(events.name, events._embedded.venues[0].name, events._embedded.venues[0].address.line1, events._embedded.venues[0].city.name, events._embedded.venues[0].state.stateCode, events._embedded.attractions[0].name, events.start_time, "")
          );

        this.spotifyService.getToken().subscribe(tokenOne => {
          this.spotifyService.searchMusic(tokenOne.access_token, events._embedded.attractions[0].name).subscribe(artistInfo => {
            this.spotifyService.getToken().subscribe(tokenTwo => {
              if (artistInfo.artists.items[0] != undefined) {
                this.spotifyService.searchAlbum(tokenTwo.access_token, artistInfo.artists.items[0].id).subscribe(artistID => {

                  this.artistsList[i].albumId = "https://open.spotify.com/embed/album/" + artistID.items[0].id;

                 // this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://open.spotify.com/embed/album/" + artistID.items[0].id);

                  // console.log(this.safeUrl);

                  console.log(this.artistsList[i]);

                  // this.artistsList = artistID.items[0].id;
                  // console.log(this.artistsList.title)

                  console.log(this.artistsList);

                });
              } else {
                this.artistsList[i].albumId = 'We did it';
              }
            });
          });
        });
      })
      // .then(() => {
      //   console.log(this.albumIDs)
      // });
      console.log(this.albumIDs);
    }, function(error) {
      console.log(error)


    });
  }
}

import { Component } from '@angular/core';
import { ConcertService } from '../concert.service';
import { SpotifyService } from '../spotify.service';
import { Result } from '../models/result.model';

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


  constructor(private concertService: ConcertService, private spotifyService: SpotifyService) {
  }

  private showSearch = true;
  private showSpin = false;

  getConcerts() {
    this.showSpin = true;
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
      let body = JSON.parse(response.toString());
      console.log("ticketmaster response = " + response);

        body._embedded.events.forEach((events, i) => {
          this.artistsList.push(
            new Result(events.name, events._embedded.venues[0].name, events._embedded.venues[0].address.line1, events._embedded.venues[0].city.name, events._embedded.venues[0].state.stateCode, events._embedded.attractions[0].name, events.start_time)
          );
          this.spotifyService.getToken().subscribe(res => {
            this.spotifyService.searchMusic(res.access_token, event.title).subscribe(res => {
              console.log(res.artists.items[0].external_urls.spotify);
            })          })
        }).then(() => {
          this.concertService.getResults(this.artistsList);
        });
      }, function(error) {
        console.log(error)

    //   body.events.event.forEach((event, i) => {
    //     this.artistsList.push(
    //       new Result(event.title, event.venue_address, event.city_name, event.region_abbr, event.postal_code, event.start_time)
    //     );
    //     this.spotifyService.getToken().subscribe(res => {
    //       this.spotifyService.searchMusic(res.access_token, event.title).subscribe(res => {
    //         console.log(res.artists.items[0].external_urls.spotify);
    //       })
    //     })
    //   }).then(() => {
    //     this.concertService.getResults(this.artistsList);
    //   });
    // }, function(error) {
    //   console.log(error)


    });
  }
}

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
  artistsList: Result[] = [];


  constructor(private concertService: ConcertService, private spotifyService: SpotifyService) {
  }

  private showSearch = true;
  private showSpin = false;


  getConcerts() {
  this.location = document.getElementById('locationSearch').value;
  this.artist = document.getElementById('artistSearch').value;
  this.startDate = document.getElementById('startDate').value;
  this.endDate = document.getElementById('endDate').value;
  let dateRange;
  if(this.endDate != "" ) {
    this.startDate = this.startDate.split('-').join('');
    this.endDate = this.endDate.split('-').join('');
    if (endDate == "") {
      this.dateRange = this.startDate + "00" + "-" + this.startDate + "00";
    } else {
      this.dateRange = this.startDate + "00" + "-" + this.endDate + "00";
    }
  }
  const test = this.concertService.onClickMe(this.location, this.artist, this.dateRange);

  test.then(response => {
    let body = JSON.parse(response);
    body.events.event.forEach((event, i) => {
      this.artistsList.push(
        new Result(event.title, event.venue_address, event.city_name, event.region_abbr, event.postal_code, event.start_time);
      );
    }).then(()=> {
      this.concertService.getResults(this.artistsList);
      this.spotifyService.getTitle(this.artistsList);
    });
  }, function(error) {
    console.log(error)
  });
  }
}

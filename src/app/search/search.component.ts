import { Component } from '@angular/core';
import { ConcertService } from '../concert.service';
import { Result } from '../models/result.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ConcertService]
})
export class SearchComponent  {
  location: string;
  artist: string;
  artistsList: Result[] = [];
  title = 'app';
  private showSearch = true;
  private showSpin = false;


  constructor(private concertService: ConcertService) {}
  getConcerts() {
  this.location = document.getElementById('locationSearch').value;
  this.artist = document.getElementById('artistSearch').value;
  this.startDate = document.getElementById('startDate').value;
  this.endDate = document.getElementById('endDate').value;
  let dateRange;
  if(this.endDate != "" )
        this.startDate = this.startDate.split('-').join('');
        this.endDate = this.endDate.split('-').join('');
      if (endDate == "") {
        this.dateRange = this.startDate + "00" + "-" + this.startDate + "00";
      } else {
        this.dateRange = this.startDate + "00" + "-" + this.endDate + "00";
      }
  const test = this.concertService.onClickMe(this.location, this.artist, this.dateRange);


  console.log(this.dateRange);
  test.then(response => {
    let body = JSON.parse(response);
    // console.log(body.events.event);
    body.events.event.forEach((event, i) => {
      this.artistsList.push(
          new Result(body.events.event[i].title, body.events.event[i].venue_address, body.events.event[i].city_name, body.events.event[i].region_abbr, body.events.event[i].postal_code, body.events.event[i].start_time);
        )
    });
    this.concertService.getResults(this.artistsList);
    console.log(this.artistsList);
  }, function(error) {
    console.log(error)
  });
  }
}

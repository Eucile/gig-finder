import { Injectable } from '@angular/core';
import { Result } from './models/result.model'

@Injectable()
export class ConcertService {
concertResults: Result[] = [];

getResults(results) {
  this.concertResults = results;
  console.log(this.concertResults);
}
  constructor() { }

  onClickMe(location, artist, startDate, endDate) {

    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      // const url = `http://api.eventful.com/json/events/search?app_key=9QjpCR7G5fwBCkmc&location=${location}&date=${dateRange}&category=music&q=${artist}`;


      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=Nftbvn2Q4XAXONxTlDS7HmjfqQc3OPml&city=${location}&countryCode=US&classificationName=music&startDateTime=${startDate}&endDateTime=${endDate}&keyword=${artist}`
      console.log(url);


      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

}

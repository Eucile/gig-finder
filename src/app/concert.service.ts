import { Injectable } from '@angular/core';
import { Result } from './models/result.model'

@Injectable()
export class ConcertService {
  constructor() { }


  onClickMe(location, artist, startDate, endDate) {

    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();


      const url = `https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=Nftbvn2Q4XAXONxTlDS7HmjfqQc3OPml&city=${location}&countryCode=US&classificationName=music&startDateTime=${startDate}&endDateTime=${endDate}&keyword=${artist}`
      console.log(url);

      request.onload = function() {
      if (request.status === 200) {
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

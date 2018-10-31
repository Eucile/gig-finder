import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Result } from './models/result.model';

@Injectable()
export class SpotifyService {

  private searchUrl: string;
  private client_id = 'e7f5f41a002a40569c8308210a584d28';
  private client_secret = '9f812061509242fb815cb7066f727d6d';
  private artistUrl: string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);
  title: string;


  constructor(private http: Http) {
  }

  getToken(){

    let params = ('grant_type=client_credentials');

    let headers = new Headers();
    headers.append( 'Authorization', 'Basic ' + this.encoded);

    headers.append('Content-Type' , 'application/x-www-form-urlencoded');

    return this.http.post('https://accounts.spotify.com/api/token', params , {headers : headers} )
    .map(res=> res.json());
  }


  searchMusic(token: string, artist: string){

    this.searchUrl = `https://api.spotify.com/v1/search?query=${artist}&offset=0&limit=1&type=artist`;
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);
    return this.http.get(this.searchUrl , {headers : headers})
    .map((res: Response) => res.json())


  }
}

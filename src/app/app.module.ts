import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { HttpModule, JsonpModule } from "@angular/http";
import { SpotifyService } from './spotify.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

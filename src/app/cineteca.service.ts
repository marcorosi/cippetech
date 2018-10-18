import { Injectable, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Observable, throwError, bindNodeCallback, of } from 'rxjs';
import { format, isToday, isFuture } from 'date-fns';

declare var require: any;

@Injectable({
  providedIn: 'root',
})
export class CinetecaService {

  url: string;
  imgproxy: string;
  xml2js: any;

  constructor(private http: HttpClient) {

    this.xml2js = require('xml2js').parseString;

    this.imgproxy = 'https://images.weserv.nl/?url=';

    //this.url= 'http://www.cinetecadibologna.it/api/GetSchedule';

    //url='https://ssl-proxy.my-addr.org/myaddrproxy.php/http/www.cinetecadibologna.it/api/GetSchedule';

    //this.url='https://cors-anywhere.herokuapp.com/www.cinetecadibologna.it/api/GetSchedule?startdate=2018-10-08&enddate=2018-10-08';

    this.url = 'https://cors-anywhere.herokuapp.com/www.cinetecadibologna.it/api/GetSchedule';

    //versione "cache"
    //this.url='https://raw.githubusercontent.com/marcorosi/cippetech/master/schedule_example.xml';
  }

  getSchedule(): Observable<any> {

    return this.http.get(this.url, { responseType: 'text' })
      .pipe(
        switchMap(res => bindNodeCallback(this.xml2js)(res))
      );
  }

  getTodaySchedule(): Observable<any[]> {

    let today = new Date();
    let from = format(today, 'YYYY-MM-DD');
    let to = from;

    let url = `${this.url}?startdate=${from}&enddate=${to}`;

    return this.http.get(url, { responseType: 'text' })
      .pipe(
        switchMap(res => bindNodeCallback(this.xml2js)(res)),
        map(data => {
          let json: any = data;
          let films: any[] = json.Scheduling.Schedule;
          //conversione e filtraggio delle date
          films.forEach(film => {

            film.dataeora = [];
            //a volte ci sono dei duplicati!
            let set = new Set<any>(film.Timetable[0].DateTime);
            let proiezioni = Array.from(set);
            proiezioni.forEach(d => {
              let dataeora = new Date(d.replace(/ /g, 'T'));
              if (isToday(dataeora) && isFuture(dataeora))
                film.dataeora.push(dataeora);
            });

            film.thumb = this.imgproxy + film.Thumbnail;
          });

          //esclusione dei film senza proiezioni rimaste
          films = films.filter(film => film.dataeora.length > 0);

          return films;
        })
      );
  }

}
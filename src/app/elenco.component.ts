import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { CinetecaService} from './cineteca.service';
//import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'elenco',
  templateUrl: './elenco.component.html',
  styleUrls: [ './elenco.component.css' ],
  //encapsulation: ViewEncapsulation.None
})
export class ElencoComponent implements OnInit  {
  
  films$:Observable<any[]>;

  fake = [1,2,3,4,5,6];

  //constructor(private cinetecaService: CinetecaService, private spinner: NgxSpinnerService){
  constructor(private cinetecaService: CinetecaService) {

  }
  
  ngOnInit(){
    console.log('parto...');
    this.films$ = this.cinetecaService.getTodaySchedule();
    /*
    this.cinetecaService.getTodaySchedule().subscribe(res=>{
        console.log(res);
        //this.spinner.hide();
        this.films=res;
      });
      */
  }
}

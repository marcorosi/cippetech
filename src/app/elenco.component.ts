import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { CinetecaService} from './cineteca.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'elenco',
  templateUrl: './elenco.component.html',
  styleUrls: [ './elenco.component.css' ]
})
export class ElencoComponent implements OnInit  {
  
  films:any[];

  constructor(private cinetecaService: CinetecaService, private spinner: NgxSpinnerService){

  }
  
  ngOnInit(){
    console.log('parto...');
    this.cinetecaService.getTodaySchedule().subscribe(res=>{
        console.log(res);
        this.spinner.hide();
        this.films=res;
      });
  }
}

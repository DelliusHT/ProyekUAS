import { Component, OnInit } from '@angular/core';
import { Todo, HomeService } from '../../home.service';

@Component({
  selector: 'app-add-langkah',
  templateUrl: './add-langkah.page.html',
  styleUrls: ['./add-langkah.page.scss'],
})
export class AddLangkahPage implements OnInit {

 
  


  constructor(private dataSvc : HomeService) { }

  ngOnInit() {
  
  }
}

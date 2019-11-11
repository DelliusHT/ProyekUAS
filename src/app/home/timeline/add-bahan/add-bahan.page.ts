import { Component, OnInit } from '@angular/core';
import { HomeService, Todo } from '../../home.service';

@Component({
  selector: 'app-add-bahan',
  templateUrl: './add-bahan.page.html',
  styleUrls: ['./add-bahan.page.scss'],
})
export class AddBahanPage implements OnInit {


  constructor(private dataSvc : HomeService) { }

  ngOnInit() {

  }

}
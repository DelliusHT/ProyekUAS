import { Component, OnInit } from '@angular/core';
import { HomeService, Todo } from '../home.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  
  todos : Todo[];
  todoId = null;

  todo: Todo= {
    idd:null,
    title: null,
    deskripsi: null,
    nmbahan: null,
    takaran: null,
    langkah: null,
    takasaji: null,
    waktusiap: null,
    totalmasak: null,
    createdAt: new Date().getTime(),
    name: null,
    date: null,
    alamat: null,
    phone: null,
    time: null,
    random:null,
    username: null,
    uid: null
  }

  constructor(private dataSvc : HomeService) { }

  ngOnInit() {
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res;
    });
    console.log("masukk")
  
  }

  async ionViewWillEnter(){
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res;
    });
    console.log("masukk")
  }
  


}

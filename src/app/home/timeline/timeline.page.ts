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
    nmbahan: null,
    createdAt: new Date().getTime(),
    takaran: null
  }

  constructor(private dataSvc : HomeService) { }

  ngOnInit() {
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

}

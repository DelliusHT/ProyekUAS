import { Component, OnInit } from '@angular/core';
import { HomeService, Todo } from '../../home.service';

@Component({
  selector: 'app-add-bahan',
  templateUrl: './add-bahan.page.html',
  styleUrls: ['./add-bahan.page.scss'],
})
export class AddBahanPage implements OnInit {

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

  remove(item){
    this.dataSvc.removeTodo(item.id);
  }

  saveTodo(){
    if(this.todoId){
      this.dataSvc.updateTodo(this.todo, this.todoId);
    }
    else{
      this.dataSvc.addTodo(this.todo);
    }
  }
}
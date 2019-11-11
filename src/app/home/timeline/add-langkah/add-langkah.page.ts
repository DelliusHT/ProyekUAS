import { Component, OnInit } from '@angular/core';
import { Todo, HomeService } from '../../home.service';

@Component({
  selector: 'app-add-langkah',
  templateUrl: './add-langkah.page.html',
  styleUrls: ['./add-langkah.page.scss'],
})
export class AddLangkahPage implements OnInit {

 
  todos : Todo[];
  todoId = null;
  todo: Todo= {
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
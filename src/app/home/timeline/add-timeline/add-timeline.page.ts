import { Component, OnInit } from '@angular/core';
import { Todo, HomeService } from '../../home.service';
import { loadingController } from '@ionic/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-add-timeline',
  templateUrl: './add-timeline.page.html',
  styleUrls: ['./add-timeline.page.scss'],
})
export class AddTimelinePage implements OnInit {

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
  }


  constructor(private dataSvc : HomeService, private loading:LoadingController, 
    private nav: NavController, private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  remove(item){
    this.dataSvc.removeTodo(item.id);
  }

 async saveTodo(){
   const loading = await this.loading.create({
     message: 'Add timeline'
   });
   await loading.present();

    if(this.todoId){

      this.dataSvc.updateTodo(this.todo, this.todoId).then(()=>{
        loading.dismiss();
        this.router.navigateByUrl('/home/tabs/timeline/add-bahan');
      });
      //this.dataSvc.updateTodo(this.todo, this.todoId);
    }
    else{
      this.dataSvc.addTodo(this.todo).then(()=>{
        loading.dismiss();
        this.router.navigateByUrl('/home');
      })
      //this.dataSvc.addTodo(this.todo);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Todo, HomeService } from '../../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detailline',
  templateUrl: './detailline.page.html',
  styleUrls: ['./detailline.page.scss'],
})
export class DetaillinePage implements OnInit {

  todoId = null;

  todo: Todo= {
    id:null,
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
  
  constructor(private dataSvc: HomeService, private route: ActivatedRoute,private loading:LoadingController, 
    private nav: NavController, private router : Router) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId){
      this.loadTodo();
    }

   }
   async loadTodo(){
    const loading = await this.loading.create({
      message: 'Loading...'
    });
    await loading.present();
    this.dataSvc.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  console.log(this.todoId);
   }


   
}

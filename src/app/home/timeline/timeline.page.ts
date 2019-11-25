import { Component, OnInit } from '@angular/core';
import { HomeService, Todo } from '../home.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plugins} from '@capacitor/core';

const{Storage} = Plugins;
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
  index:string;

  userPosts

  constructor(private dataSvc : HomeService,public afs: AngularFirestore) {  
  }

  ngOnInit() {
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  ionViewWillEnter(){
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res;
    });
    console.log("masukk")
  }
  


}

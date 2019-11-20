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

  async ngOnInit() {
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res;
    });
    
    const IdTl = await Storage.get({ key : 'IdTl'});
    this.index = IdTl.value;
    const posts = this.afs.doc(`todos/${this.index}`)
    this.userPosts = posts.valueChanges()
  
  }

  async ionViewWillEnter(){
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res;
    });
    console.log("masukk")
  }
  


}

import { Component, OnInit } from '@angular/core';
import { HomeService, Todo } from '../home.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plugins} from '@capacitor/core';
import { ToastController } from '@ionic/angular';

const{Storage} = Plugins;
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  
  todos : Todo[];
  todoId = null;

  searchv = null; 
  imagess = 'https://image.shutterstock.com/z/stock-vector-photo-coming-soon-image-eps-86220151.jpg';


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

  term = [];
  term2 = [];

  constructor(private dataSvc : HomeService,
    public afs: AngularFirestore,
    public toastController: ToastController) {  
  }

  ngOnInit() {
    this.term2=[];
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res; 
      for(let data of this.todos){
        this.term2.push(data)
      }
    });
  }

  // ionViewWillEnter(){
  //   this.dataSvc.getTodos().subscribe(res => {
  //     this.todos = res;
  //     for(let data of this.todos){
  //       this.term2.push(data)
  //     }
  //   });
  //   console.log("masukk")
  // }

  async alert(){
    const toast = await this.toastController.create({
      message: 'No data',
      duration: 2000
    });
  }

  search(){
    this.term = [];
      for(let data of this.term2){
        // console.log(data.title)
        // console.log(this.searchv)
        // this.term.push(data)
        if(data.title.toLowerCase() == this.searchv.toLowerCase()){
          //this.term = [];
        this.term.push(data)
        //console.log("yess")
        }
        else{
          console.log("no")
        }
      }
  }
  


}

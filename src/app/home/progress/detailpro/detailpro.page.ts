import { Component, OnInit } from '@angular/core';
import { Todo, HomeService, Waktu, Bahan } from '../../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Plugins} from '@capacitor/core';
const{Storage} = Plugins;

@Component({
  selector: 'app-detailpro',
  templateUrl: './detailpro.page.html',
  styleUrls: ['./detailpro.page.scss'],
})
export class DetailproPage implements OnInit {
  todoId = null;

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

  waktus:Waktu[];
  waktu: Waktu= {
    id:null,
    idw:null,
    takaransaji: null,
    waktupersiapan:null,
    totalwaktu: null,
    val:null,
    date: Date.now(),
  
  }

  bahans:Bahan[];
  bahan: Bahan= {
    idb:null,
    nmbahan: null,
    takaran: null,
    val: null,
    date: Date.now(),
  
  }
  test3 ;
  test4;
  
  constructor(private dataSvc: HomeService, 
    private route: ActivatedRoute,
    private loading:LoadingController, 
    private nav: NavController, 
    private router : Router) { }

  async ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId){
      this.loadTodo();
    }
    await Storage.set({
      key: 'IdTl',
      value: this.todoId
    });

    this.dataSvc.getBahans().subscribe(res => {
      this.bahans = res;
      //this.test3 = [];

      for(let data of this.bahans){
        if(data.idb == this.todoId ){
          this.test3 = true
        }
      }
    });

    this.dataSvc.getWaktus().subscribe(res => {
      this.waktus = res;
      //this.test4 = [];

      for(let data of this.waktus){
        if(data.idw == this.todoId ){
          this.test4 = true
        }
      }
    });

   }


   async ionViewWillEnter(){

    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId){
      this.loadTodo();
    }
    await Storage.set({
      key: 'IdTl',
      value: this.todoId
    });

    this.dataSvc.getBahans().subscribe(res => {
      this.bahans = res;
      //this.test3 = [];

      for(let data of this.bahans){
        if(data.idb == this.todoId ){
          this.test3 = true
        }
      }
    });

    this.dataSvc.getWaktus().subscribe(res => {
      this.waktus = res;
      //this.test4 = [];

      for(let data of this.waktus){
        if(data.idw == this.todoId ){
          this.test4 = true
        }
      }
    });


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

   async upload(){
    const loading = await this.loading.create({
      message: 'Add timeline'
    });
    await loading.present();
 
     if(this.todoId){
 
       this.dataSvc.updateTodo(this.todo, this.todoId).then(()=>{
         loading.dismiss();
         this.router.navigateByUrl('/home/tabs/progress');
       });
       //this.dataSvc.updateTodo(this.todo, this.todoId);
     }
     else{
       const Iduser = await Storage.get({ key : 'IdUser'});
       this.todo.idd = Iduser.value;
       this.dataSvc.addTodo(this.todo).then(()=>{
         loading.dismiss();
         this.router.navigateByUrl('/home');
       })
     }
   }


}

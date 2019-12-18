import { Component, OnInit } from '@angular/core';
import { Todo, HomeService, Langkah, Bahan, Waktu, Fav } from '../../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Plugins} from '@capacitor/core';
import { AngularFirestore } from '@angular/fire/firestore';
const{Storage} = Plugins;
 
@Component({
  selector: 'app-detailline',
  templateUrl: './detailline.page.html',
  styleUrls: ['./detailline.page.scss'],
})
export class DetaillinePage implements OnInit {
 
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
 
   
  index:string;
  term = [];
  langkahs:Langkah[];
  langkah: Langkah= {
    idl:null,
    langkah: null,
    val: null,
    date: Date.now(),
 
  }
 
  term1 = [];
  bahans:Bahan[];
  bahan: Bahan= {
    idb:null,
    nmbahan: null,
    takaran: null,
    val: null,
    date: Date.now(),
 
  }
 
  term2 = [];
  waktus:Waktu[];
  waktu: Waktu= {
    idw:null,
    takaransaji: null,
    waktupersiapan:null,
    totalwaktu: null,
    val:null,
    id:null,
    date: Date.now(),
 
  }
 
  term3 = [];
  favs:Fav[];
  fav:Fav={
    idf:null,
    idz:null,
    val:null,
    id:null
  }
  ToastController: any;
 
 
  constructor(private dataSvc: HomeService,
    private route: ActivatedRoute,
    private loading:LoadingController,
    private nav: NavController,
    public toastController: ToastController,
    private router : Router,
    public afstore: AngularFirestore) { }
 
  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId){
      this.loadTodo();
 
      this.dataSvc.getLangkahs().subscribe(res => {
        this.langkahs = res;
        this.term = [];
       
        for(let data of this.langkahs){
          if(data.idl == this.todoId ){
           this.term.push(data);
          }
        }
      });
 
 
 
      this.dataSvc.getBahans().subscribe(res => {
        this.bahans = res;
 
        this.term1 = [];
       
        for(let data of this.bahans){
          if(data.idb == this.todoId ){
           this.term1.push(data);
          }
        }
 
      });
 
      this.dataSvc.getWaktus().subscribe(res => {
        this.waktus = res;
 
        this.term2 = [];
       
        for(let data of this.waktus){
          if(data.idw == this.todoId ){
           this.term2.push(data);
          }
        }
 
      });
   
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
 
    async favorite(){
    let c=0;
    const IdUser = await Storage.get({ key : 'IdUser'});
    this.index = IdUser.value;
    console.log(this.index);
    this.fav.idf = this.todoId;
    this.fav.id = this.todoId;
    this.fav.val = this.todoId;
    this.fav.idz = this.index;
    var iterasi = 0;
    //this.dataSvc.addFav(this.fav)
    //console.log(this.fav)
 
    this.dataSvc.getFavs().subscribe(res => {
      this.favs = res;
      console.log(this.favs);
      if(this.favs.length != 0){
        console.log("masuk if")
        for(let dataf of this.favs){
          console.log("masuk for");
          if(dataf.idf == this.todoId && dataf.idz == this.index){
            console.log("masuk if 1");
            // console.log(dataf.id); 
            iterasi=1;
            //this.dataSvc.addFav(this.fav)
            break;
          }
        }
        if(iterasi == 0){
          console.log("iterasi nya masuk 0")
          this.dataSvc.addFav(this.fav);
          this.dataSvc.fav();
        }
      }
     
      else{
        c=1;
        console.log('ccccc');
        console.log(c);
        if(c == 1){
          this.dataSvc.addFav(this.fav);
          this.dataSvc.fav();
          console.log("sukk");
        }
      }
    });
   }
}
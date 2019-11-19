import { Component, OnInit } from '@angular/core';
import { Todo, HomeService, Langkah, Bahan, Waktu } from '../../home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Plugins} from '@capacitor/core';
const{Storage} = Plugins;

@Component({
  selector: 'app-detailline',
  templateUrl: './detailline.page.html',
  styleUrls: ['./detailline.page.scss'],
})
export class DetaillinePage implements OnInit {

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
    random:null
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
    date: Date.now(),
  
  }
  
  constructor(private dataSvc: HomeService, 
    private route: ActivatedRoute,
    private loading:LoadingController, 
    private nav: NavController, 
    private router : Router) { }

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


   
}

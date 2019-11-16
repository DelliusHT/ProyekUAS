import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService, Langkah, Waktu } from '../../home.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Plugins} from '@capacitor/core';
const{Storage} = Plugins;

@Component({
  selector: 'app-addlangkah',
  templateUrl: './addlangkah.page.html',
  styleUrls: ['./addlangkah.page.scss'],
})
export class AddlangkahPage implements OnInit {
  todoId:null;

  langkahs:Langkah[];
  langkah: Langkah= {
    idl:null,
    langkah: null,
    val: null,
    date: Date.now(),
  
  }


  waktus:Waktu[];
  waktu: Waktu= {
    idw:null,
    takaransaji: null,
    waktupersiapan:null,
    totalwaktu: null,
    val:null,
    date: Date.now(),
  
  }

  constructor(private dataSvc : HomeService, 
    private loading:LoadingController, 
    private nav: NavController, 
    private route: ActivatedRoute, 
    private router : Router ) { }

  ngOnInit() {
    this.dataSvc.getLangkahs().subscribe(res => {
      this.langkahs = res;
    });
  }

  async savelangkah(){
 
      this.langkah.val = this.langkah.val +1
       const IdTl = await Storage.get({ key : 'IdTl'});
       this.langkah.idl = IdTl.value;
       this.dataSvc.addLangkah(this.langkah).then(()=>{
       })
       //this.dataSvc.addTodo(this.todo);
   }

   remove(item){
    this.dataSvc.removeLangkah(item.id);
  }

  async upload(){
    const loading = await this.loading.create({
      message: 'Add timeline'
    });
    await loading.present();
 
     if(this.todoId){
 
      //  this.dataSvc.updateTodo(this.todo, this.todoId).then(()=>{
      //    loading.dismiss();
      //    this.router.navigateByUrl('/home/tabs/progress');
      //  });
      //  //this.dataSvc.updateTodo(this.todo, this.todoId);
     }
     else{
       const Iduser = await Storage.get({ key : 'IdUser'});
       this.waktu.idw = Iduser.value;
       this.dataSvc.addWaktu(this.waktu).then(()=>{
         loading.dismiss();
         this.router.navigateByUrl('/home/tabs/progress/');
       })
       //this.dataSvc.addTodo(this.todo);
     }
   }


}

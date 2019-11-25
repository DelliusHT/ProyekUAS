import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Todo, HomeService, Langkah, Bahan, Waktu } from '../../home.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

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
    random: null,
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
  ayam : Waktu
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
idedit: string;
  testtid: null;

  constructor(private dataSvc: HomeService, private route: ActivatedRoute,private loading:LoadingController, 
    private nav: NavController, private router : Router) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId){
      this.loadTodo();
    }

    this.dataSvc.getLangkahs().subscribe(res => {
      this.langkahs = res;
      this.term = [];
      
      for(let data of this.langkahs){
        if(data.idl == this.todoId ){
         this.term.push(data);
         console.log(data)
        }
      }
    });



    this.dataSvc.getBahans().subscribe(res => {
      this.bahans = res;

      this.term1 = [];
      
      for(let data of this.bahans){
        if(data.idb == this.todoId ){
         this.term1.push(data);
         //console.log(data.id)
        }
      }

    });


    this.dataSvc.getWaktus().subscribe(res => {
      this.waktus = res;

      this.term2 = [];
      
      for(let data of this.waktus){
        if(data.idw == this.todoId ){
         this.term2.push(data);
         this.idedit = data.id
         this.waktu = data;
         //console.log(this.waktu)
        }
      }

    });
  
  }

  remove(data){
    console.log(data);
    this.dataSvc.removeLangkah(data.id);
  }
  remove1(data1){
    this.dataSvc.removeBahan(data1.id);
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

   test(){
     console.log(this.waktu)
    //  for(let bahanx of this.bahans){

    //   if(bahanx.id == this.todoId){
    //   this.testtid = bahanx.id
    //   this.dataSvc.updateBahan(this.bahan, this.testtid);
    //   }
    // }


    //udah bisa updatewaktu
    this.dataSvc.updateWaktu(this.waktu, this.idedit);
   }
   
   saveTodo(){
    if(this.todoId){
      this.dataSvc.updateTodo(this.todo, this.todoId);
      // for(let bahanx of this.bahans){

      //   if(bahanx.id == this.todoId){
      //   this.testtid = bahanx.id
      //   this.dataSvc.updateBahan(this.bahan, this.testtid);
      //   }
      // }
      this.dataSvc.updateWaktu(this.waktu, this.todoId);
      this.dataSvc.updateLangkah(this.langkah, this.todoId);
      this.dataSvc.updateBahan(this.bahan, this.todoId);
    }
    else{
      this.dataSvc.addTodo(this.todo);
    }
    this.router.navigateByUrl('/home/tabs/profile'); 
  }

 savebahan(){
    this.bahan.val = this.bahan.val +1
     this.bahan.idb = this.todoId;
     this.dataSvc.addBahan(this.bahan).then(()=>{
     })
     //this.dataSvc.addTodo(this.todo);
 }
savelangkah(){
 
  this.langkah.val = this.langkah.val +1000
   this.langkah.idl = this.todoId;
   this.dataSvc.addLangkah(this.langkah).then(()=>{
   })
   //this.dataSvc.addTodo(this.todo);
}
saveedit(data){
  this.dataSvc.updateLangkah(data, data.id);
}
  
}

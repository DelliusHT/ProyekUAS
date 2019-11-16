import { Component, OnInit } from '@angular/core';
import { HomeService, Todo, Bahan } from '../../home.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins} from '@capacitor/core';
const{Storage} = Plugins;
@Component({
  selector: 'app-addbahan',
  templateUrl: './addbahan.page.html',
  styleUrls: ['./addbahan.page.scss'],
})
export class AddbahanPage implements OnInit {

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
    createdAt:  Date.now(),
    name: null,
    date: null,
    alamat: null,
    phone: null,
    time: null,
    random: null
  }

  bahans:Bahan[];
  bahan: Bahan= {
    idb:null,
    nmbahan: null,
    takaran: null,
    val: null,
    date: Date.now(),
  
  }

  constructor(private dataSvc : HomeService, 
    private loading:LoadingController, 
    private nav: NavController, 
    private route: ActivatedRoute, 
    private router : Router ) { }

  ngOnInit() {
    this.dataSvc.getBahans().subscribe(res => {
      this.bahans = res;
    });

  }


  async savebahan(){
      this.bahan.val = this.bahan.val +1
       const IdTl = await Storage.get({ key : 'IdTl'});
       this.bahan.idb = IdTl.value;
       this.dataSvc.addBahan(this.bahan).then(()=>{
       })
       //this.dataSvc.addTodo(this.todo);
   }

   remove(item){
    this.dataSvc.removeBahan(item.id);
  }


   async upload(){
    const loading = await this.loading.create({
      message: 'Add Bahan..'
    });
    await loading.present();
    const Iduser = await Storage.get({ key : 'IdTl'});
    this.todoId = Iduser.value;
     
         loading.dismiss();
         this.router.navigateByUrl('/home/tabs/progress/'+this.todoId);
  }


}

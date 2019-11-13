import { Component, OnInit } from '@angular/core';  
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HomeService, Todo } from '../home.service'; 
import { Plugins} from '@capacitor/core';
import { RegisterService, Register } from 'src/app/register/register.service';
const{Storage} = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isLoading = false;

  todos : Todo[]; 
  todoId = null;
  profile : Register[]; 
  
  test2 = [];
  testdata = "";
  testid = "";

  test3 = [];
  testdata3 = "";
  testid3 = "";


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
  }

  regis: Register= {
    id: null,
    nama: null,
    jenisKelamin: null,
    alamat: null,
    noHp: null,
}


  constructor(private dataSvc : HomeService,
    private resSvc : RegisterService,
    private router: Router,
    private loadingCtrl: LoadingController, private route: ActivatedRoute) { }
    
   async ngOnInit() {
    const Iduser = await Storage.get({ key : 'IdUser'});
    this.testid = Iduser.value;
    this.testid3 = Iduser.value;
    console.log(this.testid)

      this.dataSvc.getTodos().subscribe(res => {
        this.todos = res;

        for(let data of this.todos){
          if(data.idd == this.testid ){
           this.test2.push(data);
          }
        }
      });
      
      this.resSvc.getRegisters().subscribe(res => {
        this.profile = res;
        
    
        for(let data3 of this.profile){
          if(data3.id == this.testid3){
           this.test3.push(data3);
          }
          
         console.log(this.test3)
        }
      });
    
    }


  onLoading() {
    this.isLoading = true;
    this.loadingCtrl.create({keyboardClose: true, message: 'Loading in...'})
        .then(loadingEl => {
            loadingEl.present();

            setTimeout(() => {
                this.isLoading = false;
                loadingEl.dismiss();
                this.router.navigateByUrl('/home/tabs/profile/edit-profile"'); 
            }, 1000);
        })
  }

  remove(item){
    this.dataSvc.removeTodo(item.id);
  }


}

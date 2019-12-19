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
  imagess = 'https://image.shutterstock.com/z/stock-vector-photo-coming-soon-image-eps-86220151.jpg';
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
    random: null,
    username: null,
    uid: null
  }

  regis: Register= {
    iddd: null,
    nama: null,
    jenisKelamin: null,
    alamat: null,
    noHp: null,
    uid: null
}


  constructor(private dataSvc : HomeService,
    private resSvc : RegisterService,
    private router: Router,
    private loadingCtrl: LoadingController, 
    private route: ActivatedRoute) { }
    
   async ngOnInit() {
    const Iduser = await Storage.get({ key : 'IdUser'}); 
    this.testid = Iduser.value;
    this.testid3 = Iduser.value; 

      this.dataSvc.getTodos().subscribe(res => {
        this.todos = res;
        this.test2 = [];

        for(let data of this.todos){
          if(data.idd == this.testid ){
           this.test2.push(data);
          }
        }

        // console.log(this.test2);
      });
      
      this.resSvc.getRegisters().subscribe(res => {
        this.profile = res;
        this.test3 = [];
        
    
        for(let data3 of this.profile){
          if(data3.iddd == this.testid3){
           this.test3.push(data3);
          }
          
         console.log(this.test3)
        }
      });
    }


    async ionViewWillEnter(){

      const Iduser = await Storage.get({ key : 'IdUser'}); 
      this.testid = Iduser.value;
      this.testid3 = Iduser.value; 
  
        this.dataSvc.getTodos().subscribe(res => {
          this.todos = res;
          this.test2 = [];
  
          for(let data of this.todos){
            if(data.idd == this.testid ){
             this.test2.push(data);
            }
          }
  
          // console.log(this.test2);
        });
        
        this.resSvc.getRegisters().subscribe(res => {
          this.profile = res;
          this.test3 = [];
          
      
          for(let data3 of this.profile){
            if(data3.iddd == this.testid3){
             this.test3.push(data3);
            }
             
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
                this.router.navigateByUrl('/home/tabs/profile/edit-profile'); 
            }, 1000);
        })
  }

  remove(item){ 
    this.dataSvc.removeTodo(item.id);
  }

  async exit(){
    await Storage.clear();
    this.router.navigateByUrl('/login'); 
  }

}

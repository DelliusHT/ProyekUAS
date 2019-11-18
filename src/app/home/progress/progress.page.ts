import { Component, OnInit } from '@angular/core';
import { HomeService, Todo } from '../home.service';
import { RegisterService } from 'src/app/register/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Plugins} from '@capacitor/core';

const{Storage} = Plugins;

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {
  isLoading = false;

  todos : Todo[]; 
  todoId = null;
  
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
  }

  constructor(private dataSvc : HomeService,
    private resSvc : RegisterService,
    private router: Router,
    private loadingCtrl: LoadingController, 
    private route: ActivatedRoute) { }

 async ngOnInit() {

  const Iduser = await Storage.get({ key : 'IdUser'});
  console.log(Iduser);
  this.testid = Iduser.value;
      this.dataSvc.getTodos().subscribe(res => {
        this.todos = res;
        this.test2 = [];

        for(let data of this.todos){
          if(data.idd == this.testid ){
           this.test2.push(data);
           
          }
        }
      });
  }

  async ionViewWillEnter(){

    const Iduser = await Storage.get({ key : 'IdUser'});
    console.log(Iduser);
    this.testid = Iduser.value;
        this.dataSvc.getTodos().subscribe(res => {
          this.todos = res;
          this.test2 = [];
  
          for(let data of this.todos){
            if(data.idd == this.testid ){
             this.test2.push(data);
             
            }
          }
        });
  }

  remove(item){
    this.dataSvc.removeTodo(item.id);
  }

}

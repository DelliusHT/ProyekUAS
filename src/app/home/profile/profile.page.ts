import { Component, OnInit } from '@angular/core';  
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HomeService, Todo } from '../home.service';
import { Plugins} from '@capacitor/core';
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
  
  test2 = [];
  testdata = "";
  testid = "";

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



  constructor(private dataSvc : HomeService,
    private router: Router,
    private loadingCtrl: LoadingController, private route: ActivatedRoute) { }
    
   async ngOnInit() {
    const Iduser = await Storage.get({ key : 'IdUser'});
    this.testid = Iduser.value;
    console.log(this.testid)
      this.dataSvc.getTodos().subscribe(res => {
        this.todos = res;

        for(let data of this.todos){
          if(data.idd == this.testid ){
           this.test2.push(data);
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
                this.router.navigateByUrl('/home/tabs/profile/edit-profile"'); 
            }, 1000);
        })
  }

  remove(item){
    this.dataSvc.removeTodo(item.id);
  }


}

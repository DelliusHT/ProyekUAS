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
    
    ngOnInit() {
      this.loadTodo();
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

  async loadTodo(){
    const Iduser = await Storage.get({ key : 'IdUser'});
    this.todo.idd = Iduser.value;
    this.dataSvc.getTodo(this.todo.idd).subscribe(res => { 
      this.todo = res;
    });

  console.log(this.todo.idd);
   }

}

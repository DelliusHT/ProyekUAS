import { Component, OnInit } from '@angular/core';
import { Todo, HomeService } from '../../home.service';
import { Plugins} from '@capacitor/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

const{Storage} = Plugins;
@Component({
  selector: 'app-add-langkah',
  templateUrl: './add-langkah.page.html',
  styleUrls: ['./add-langkah.page.scss'],
})
export class AddLangkahPage implements OnInit {
  constructor(private dataSvc : HomeService, 
    private loading:LoadingController, 
    private nav: NavController, 
    private route: ActivatedRoute,
     private router : Router) { }
     
     todos : Todo[];
     todoId = null;
   
     todo: Todo= {
       idd:null,
       title: null,
       deskripsi: null,
       nmbahan: null,
       takaran: null,
       langkah:null,
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

     datatle:string;
  async ngOnInit() {
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res;
    });


    const titleuser = await Storage.get({ key : 'title'});
    this.datatle = titleuser.value
    // for(let data of this.todos){
    //   if(data.title == this.datatle ){
    //    this.test2.push(data.id);
    //   }
    // }

  
  }
}

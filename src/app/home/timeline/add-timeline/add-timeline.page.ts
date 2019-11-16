import { Component, OnInit } from '@angular/core';
import { Todo, HomeService } from '../../home.service';
import { loadingController } from '@ionic/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Plugins} from '@capacitor/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';


const{Storage} = Plugins;

@Component({
  selector: 'app-add-timeline',
  templateUrl: './add-timeline.page.html',
  styleUrls: ['./add-timeline.page.scss'],
})
export class AddTimelinePage implements OnInit {
  photos: any[];
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
    random: null
  }


  constructor(private dataSvc : HomeService, private loading:LoadingController, 
    private nav: NavController, private route: ActivatedRoute, private router : Router,
    public camera: Camera, public file: File) { }

  ngOnInit() {
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  remove(item){
    this.dataSvc.removeTodo(item.id);
  }

 async saveTodo(){
   const loading = await this.loading.create({
     message: 'Add timeline'
   });
   await loading.present();

    if(this.todoId){

      this.dataSvc.updateTodo(this.todo, this.todoId).then(()=>{
        loading.dismiss();
        this.router.navigateByUrl('/home/tabs/progress');
      });
      //this.dataSvc.updateTodo(this.todo, this.todoId);
    }
    else{
      const Iduser = await Storage.get({ key : 'IdUser'});
      this.todo.idd = Iduser.value;
      this.dataSvc.addTodo(this.todo).then(()=>{
        loading.dismiss();
        this.router.navigateByUrl('/home/tabs/progress/');
      })
      //this.dataSvc.addTodo(this.todo);
    }
  }

  TakePhotos(){
    var option: CameraOptions={
      quality: 100,
      mediaType:this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG
    }
    this.camera.getPicture().then((ImageData)=>{
      let filename = ImageData.substring(ImageData.lastIndexOf('/')+1);
      let path = ImageData.substring(0,ImageData.lastIndexOf('/')+1);
      this.file.readAsDataURL(path,filename).then((base64data)=>{
        this.photos.push(base64data)
      })
    })
  }

}

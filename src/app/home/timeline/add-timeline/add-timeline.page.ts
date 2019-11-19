import { Component, OnInit } from '@angular/core';
import { Todo, HomeService } from '../../home.service';
import { loadingController } from '@ionic/core';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Plugins} from '@capacitor/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';


const{Storage} = Plugins;

@Component({
  selector: 'app-add-timeline',
  templateUrl: './add-timeline.page.html',
  styleUrls: ['./add-timeline.page.scss'],
})
export class AddTimelinePage implements OnInit {
  imagess = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  imagePath: string;
  upload: any;
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
    private camera: Camera, public file: File,public afSG: AngularFireStorage,
    public alertController: AlertController) { }

  ngOnInit() {
    this.dataSvc.getTodos().subscribe(res => {
      this.todos = res;
    });
  }
 
  async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.openCamera();
      this.imagess = 'data:image/jpg;base64,' + cameraPhoto;
    } else {
      console.log('library');
      const libraryImage = await this.openLibrary();
      this.imagess = 'data:image/jpg;base64,' + libraryImage;
    }
  }

  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

async openLibrary() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 1000,
    targetHeight: 1000,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };
  return await this.camera.getPicture(options);
}

  remove(item){
    this.dataSvc.removeTodo(item.id);
  }

 async saveTodo(){
   const loading = await this.loading.create({
     message: 'Add timeline..'
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
        this.router.navigateByUrl('/home/tabs/progress');
      })
      //this.dataSvc.addTodo(this.todo);
    }
  }

  // TakePhotos(){
  //   var option: CameraOptions={
  //     quality: 100,
  //     mediaType:this.camera.MediaType.PICTURE,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG
  //   }
  //   this.camera.getPicture().then((ImageData)=>{
  //     let filename = ImageData.substring(ImageData.lastIndexOf('/')+1);
  //     let path = ImageData.substring(0,ImageData.lastIndexOf('/')+1);
  //     this.file.readAsDataURL(path,filename).then((base64data)=>{
  //       this.photos.push(base64data)
  //     })
  //   })
  // }

async uploadFirebase() {
	const loading = await this.loading.create({
		duration: 2000
	});
  await loading.present();
  this.imagePath = new Date().getTime() + '.jpg';
	this.upload = this.afSG.ref(this.imagePath).putString(this.imagess, 'data_url');
	this.upload.then(async () => {
		await loading.onDidDismiss();
		this.imagess = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
		const alert = await this.alertController.create({
			header: 'Félicitation',
			message: 'L\'envoi de la photo dans Firebase est terminé!',
			buttons: ['OK']
		});
		await alert.present();
	});
}

}

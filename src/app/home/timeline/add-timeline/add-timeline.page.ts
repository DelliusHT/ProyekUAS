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
  import { Http } from '@angular/http'
  import { AngularFirestore } from '@angular/fire/firestore';
  import { firestore } from 'firebase/app';
import { Register, RegisterService } from 'src/app/register/register.service';


const{Storage} = Plugins;

@Component({
  selector: 'app-add-timeline',
  templateUrl: './add-timeline.page.html',
  styleUrls: ['./add-timeline.page.scss'],
})
export class AddTimelinePage implements OnInit {
  imageURL: string;
  desc: string;

  poto;
  imageSource;
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
    random: null,
    username: null,
    uid: null
  }

  
  registers:Register[];
  regis: Register= {
    iddd: null,
    nama: null,
    jenisKelamin: null,
    alamat: null,
    noHp: null,
    uid: null
}

testid
term6 = [];
nama


  constructor(private dataSvc : HomeService, private loading:LoadingController, 
    private nav: NavController, private route: ActivatedRoute, private router : Router,
    private camera: Camera, public file: File,public afSG: AngularFireStorage,
    public alertController: AlertController, public http: Http, public afstore: AngularFirestore, private regisSVC:RegisterService) { }

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
      this.testid = Iduser.value;
      this.regisSVC.getRegisters().subscribe(res => {
        this.registers = res;
  
        for(let data of this.registers){
          if(data.iddd == this.testid){
            this.term6.push(data)
            this.nama = data.nama;
            this.todo.name = data.nama;
           console.log(this.todo.name)
           this.dataSvc.addTodo(this.todo).then(()=>{
            loading.dismiss();
            console.log("asdasd"+ this.term6)
            console.log(this.nama)
            this.router.navigateByUrl('/home/tabs/progress');
          })

          }
  
        }
      });
      console.log(this.todo.name)
      // this.dataSvc.addTodo(this.todo).then(()=>{
      //   loading.dismiss();
      //   console.log("asdasd"+ this.term6)
      //   console.log(this.nama)
      //   this.router.navigateByUrl('/home/tabs/progress');
      // })
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

// async uploadFirebase() {
// 	const loading = await this.loading.create({
// 		duration: 2000
// 	});
//   await loading.present();
//   this.imagePath = new Date().getTime() + '.jpg';
// 	this.upload = this.afSG.ref(this.imagePath).putString(this.imagess, 'data_url');
// 	this.upload.then(async () => {
// 		await loading.onDidDismiss();
// 		this.imagess = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
// 		const alert = await this.alertController.create({
// 			header: 'Félicitation',
// 			message: 'L\'envoi de la photo dans Firebase est terminé!',
// 			buttons: ['OK']
// 		});
// 		await alert.present();
// 	});
// }

	fileChanged(event) {
		const files = event.target.files
    const data = new FormData()
    data.append('file',files[0])
		data.append('UPLOADCARE_STORE', '1')
		data.append('UPLOADCARE_PUB_KEY', '070be25fc4d496f21df3')
		  
    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event =>{
      console.log(event)
      this.imageURL = event.json().file
    })
	}
}

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

  const{Storage} = Plugins;
@Component({
  selector: 'app-addphoto',
  templateUrl: './addphoto.page.html',
  styleUrls: ['./addphoto.page.scss'],
})
export class AddphotoPage implements OnInit {
  imageURL: string;
  desc: string;

  index:string;
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


  constructor(private dataSvc : HomeService, private loading:LoadingController, 
    private nav: NavController, private route: ActivatedRoute, private router : Router,
    private camera: Camera, public file: File,public afSG: AngularFireStorage,
    public alertController: AlertController, public http: Http, public afstore: AngularFirestore) { }

  ngOnInit() {
  }
  
  async createPost(){
    const IdTl = await Storage.get({ key : 'IdTl'});
    this.index = IdTl.value;
    const image = this.imageURL 
    this.afstore.doc(`todos/${this.index}`).update({
      uid: image
    })
    this.router.navigateByUrl('/home/tabs/progress')
  }
  
//   async uploadFirebase() {
// 	const loading = await this.loading.create({
// 		duration: 2000
// 	});
//   await loading.present(); 
// 	this.upload.then(async () => {
// 		await loading.onDidDismiss(); 
// 		const alert = await this.alertController.create({
// 			header: 'Upload',
// 			message: 'Upload Succesfull',
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

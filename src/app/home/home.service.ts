import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AppRoutingModule } from '../app-routing.module';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo {
  idd:string,
  title: string;
  deskripsi: string;
  nmbahan: string;
  takaran: number;
  langkah:string;
  takasaji: string;
  waktusiap: string;
  totalmasak: string;
  createdAt: number;
  name: string;
  date: Date;
  alamat: string;
  phone: number;
  time: number;
  random: number;
  username: string;
  uid: string;
}

export interface Langkah {
  idl:string,
  langkah: string,
  val:number,
  date: number;
}

export interface Waktu {
  idw:string,
  takaransaji: string,
  waktupersiapan: string,
  totalwaktu:string,
  val:string,
  id:string,
  date: number;
}

export interface Bahan {
  idb:string,
  nmbahan: string,
  takaran: string,
  val:string,
  date: number;
}

export interface Fav{
  idf:string,
  idz:string,
  val:string,
  id:string;
}

export interface Meet {
  judul:string,
  idm:string,
  waktu: string,
  hari: string,
  url:string,
  date: number;
}

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  
  
  private todo: Todo
  private todosCollection: AngularFirestoreCollection<Todo>;
  private todos: Observable<Todo[]>;

  //---------------------
  private langkahCollection: AngularFirestoreCollection<Langkah>;
  private langkahs: Observable<Langkah[]>;
  //--------------------
  private bahanCollection: AngularFirestoreCollection<Bahan>;
  private bahans: Observable<Bahan[]>;
  //--------------------
  private waktuCollection: AngularFirestoreCollection<Waktu>;
  private waktus: Observable<Waktu[]>;
  //--------------------
  private favCollection: AngularFirestoreCollection<Fav>;
  private favs: Observable<Fav[]>;
  //--------------------
  private meetCollection: AngularFirestoreCollection<Meet>;
  private meets: Observable<Meet[]>;


  constructor(db : AngularFirestore ) { 


    this.todosCollection = db.collection<Todo>('todos');
  //   this.todos = this.todosCollection.snapshotChanges().pipe(
  //     map(actions => {
  //         return actions.map(a => {
  //             const data = a.payload.doc.data();
  //             const id = a.payload.doc.id;
  //             return {id, ...data};
  //         });
  //     })
  // );

// Langkah -Langkah

this.langkahCollection = db.collection<Langkah>('Langkah', ref => ref.orderBy('val'));
  // this.langkahs = this.langkahCollection.snapshotChanges().pipe(
  //   map(actions => {
  //       return actions.map(a => {
  //           const data = a.payload.doc.data();
  //           const id = a.payload.doc.id;
  //           return {id, ...data};
  //       });
  //   })
  // );


//Bahan
  this.bahanCollection = db.collection<Bahan>('Bahan', ref => ref.orderBy('val'));
  // this.bahans = this.bahanCollection.snapshotChanges().pipe(
  //   map(actions => {
  //       return actions.map(a => {
  //           const data = a.payload.doc.data();
  //           const id = a.payload.doc.id;
  //           return {id, ...data};
  //       });
  //   })
  // );

//Waktu

this.waktuCollection = db.collection<Waktu>('Waktu');
// this.waktus = this.waktuCollection.snapshotChanges().pipe(
//   map(actions => {
//       return actions.map(a => {
//           const data = a.payload.doc.data();
//           const id = a.payload.doc.id;
//           return {id, ...data};
//       });
//   })
// );

//fav

this.favCollection = db.collection<Fav>('Fav');
// this.favs = this.favCollection.snapshotChanges().pipe(
//   map(actions => {
//       return actions.map(a => {
//           const data = a.payload.doc.data();
//           const id = a.payload.doc.id;
//           return {id, ...data};
//       });
//   })
// );
this.meetCollection = db.collection<Meet>('Meet');
// this.waktus = this.waktuCollection.snapshotChanges().pipe(
//   map(actions => {
//       return actions.map(a => {
//           const data = a.payload.doc.data();
//           const id = a.payload.doc.id;
//           return {id, ...data};
  }



  setUser(todo: Todo){
    this.todo = todo
  }

  getUID(){
    return this.todo.idd
  }

  getTodos(){
    return this.todosCollection.snapshotChanges().pipe(
      map(actions => {
          return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id, ...data};
          });
      })
  );
    // return this.todos;
}

getTodo(id){
    return this.todosCollection.doc<Todo>(id).valueChanges();
}


updateTodo(todo: Todo, id: string){
    return this.todosCollection.doc(id).update(todo);
}

addTodo(todo: Todo){
    return this.todosCollection.add(todo);
}

removeTodo(id){
    return this.todosCollection.doc(id).delete();
}





//Langkah - langkah




getLangkahs(){
  //return this.langkahs;
  return this.langkahCollection.snapshotChanges().pipe(
    map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
        });
    })
  );
}

getLangkah(id){
  return this.langkahCollection.doc<Langkah>(id).valueChanges();
}


updateLangkah(langkah: Langkah, id: string){
  return this.langkahCollection.doc(id).update(langkah);
}

addLangkah(langkah: Langkah){
  return this.langkahCollection.add(langkah);
}

removeLangkah(id){
  return this.langkahCollection.doc(id).delete();
}




//Bahan


getBahans(){
  //return this.bahans;
  return this.bahanCollection.snapshotChanges().pipe(
    map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
        });
    })
  );
}

getBahan(id){
  return this.bahanCollection.doc<Bahan>(id).valueChanges();
}


updateBahan(bahan: Bahan, id: string){
  return this.bahanCollection.doc(id).update(bahan);
}

addBahan(bahan: Bahan){
  return this.bahanCollection.add(bahan);
}

removeBahan(id){
  return this.bahanCollection.doc(id).delete();
}

//waktu


getWaktus(){
  //return this.waktus;
return this.waktuCollection.snapshotChanges().pipe(
  map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
      });
  })
);
}

getWaktu(id){
  return this.waktuCollection.doc<Waktu>(id).valueChanges();
}


updateWaktu(waktu: Waktu, id: string){
  return this.waktuCollection.doc(id).update(waktu);
}

addWaktu(waktu: Waktu){
  return this.waktuCollection.add(waktu);
}

removeWaktu(id){
  return this.waktuCollection.doc(id).delete();
}

//fav
getFavs(){
  //return this.favs;
return this.favCollection.snapshotChanges().pipe(
  map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
      });
  })
);
}

getFav(id){
  return this.favCollection.doc<Fav>(id).valueChanges();
}


updateFav(fav: Fav, id: string){
  return this.favCollection.doc(id).update(fav);
}

addFav(fav: Fav){
  return this.favCollection.add(fav);
}

removeFav(id){
  return this.favCollection.doc(id).delete();
}

//meeting
getMeets(){
  //return this.waktus;
return this.meetCollection.snapshotChanges().pipe(
  map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
      });
  })
);
}

getMeet(id){
  return this.meetCollection.doc<Meet>(id).valueChanges();
}


updateMeet(meet: Meet, id: string){
  return this.meetCollection.doc(id).update(meet);
}

addMeet(meet: Meet){
  return this.meetCollection.add(meet);
}

removeMeet(id){
  return this.meetCollection.doc(id).delete();
}


}

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
}

export interface Langkah {
  idl:string,
  langkah: string,
  val:string,
  date: number;
}

export interface Waktu {
  idw:string,
  takaransaji: string,
  waktupersiapan: string,
  totalwaktu:string,
  val:string,
  date: number;
}

export interface Bahan {
  idb:string,
  nmbahan: string,
  takaran: string,
  val:string,
  date: number;
}

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  
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


  constructor(db : AngularFirestore ) { 


    this.todosCollection = db.collection<Todo>('todos');
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
          return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id, ...data};
          });
      })
  );

// Langkah -Langkah

  this.langkahCollection = db.collection<Langkah>('Langkah');
  this.langkahs = this.langkahCollection.snapshotChanges().pipe(
    map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
        });
    })
  );


//Bahan
  this.bahanCollection = db.collection<Bahan>('Bahan');
  this.bahans = this.bahanCollection.snapshotChanges().pipe(
    map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
        });
    })
  );

//Waktu

this.waktuCollection = db.collection<Waktu>('Waktu');
this.waktus = this.waktuCollection.snapshotChanges().pipe(
  map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
      });
  })
);


  }

  getTodos(){
    return this.todos;
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
  return this.langkahs;
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
  return this.bahans;
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
  return this.waktus;
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



}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Register {
    iddd: string,
    nama: string,
    jenisKelamin: string,
    alamat: string,
    noHp: string,
    uid: string;
}

@Injectable({
    providedIn: 'root'
})
export class RegisterService{
    private registerCollection: AngularFirestoreCollection<Register>;
    private registers: Observable<Register[]>;

    constructor(db: AngularFirestore){
        this.registerCollection = db.collection<Register>('register');

        // this.registers = this.registerCollection.snapshotChanges().pipe(
        //     map(actions => {
        //         return actions.map(a => {
        //             const data = a.payload.doc.data();
        //             const id = a.payload.doc.id;
        //             return {id, ...data};
        //         });
        //     })
        // );
    }

    getRegisters(){
        return this.registerCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            })
        );
    }
    getRegister(id){
        return this.registerCollection.doc<Register>(id).valueChanges();
    }
    updateRegister(register: Register, id: string){
        return this.registerCollection.doc(id).update(register);
    }

    addRegister(register: Register){
        return this.registerCollection.add(register);
    }

    removeRegister(id){
        return this.registerCollection.doc(id).delete();
    }

}
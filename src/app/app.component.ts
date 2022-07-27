import { Component } from "@angular/core";
import { collectionData,Firestore,collection, DocumentData, doc, addDoc, docData, updateDoc, deleteDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";

interface Item {
  id:string
  firstName: string
  lastName: string
  phone: string
};

@Component({
  selector: 'app-root',
  template: `
  <p>Salom</p>
  <ul>
    <form #form="ngForm" (submit)="onSubmit(form.value)">
      <div class="control">
        <label for="fname">Ism</label>
        <input ngModel name="fname" type="text">
      </div>
      <div class="control">
        <label for="lname">Familiya</label>
        <input ngModel name="lname" type="text">
      </div>
      <div class="control">
        <label for="phone">Phone</label>
        <input ngModel name="phone" type="text">
      </div>
      <p>{{form.value|json}}</p>
      <button>Send</button>
    </form>
    <li *ngFor="let item of item$ | async">
      {{ 200 }}
    </li>
  </ul>
  `
})
export class AppComponent {
  item$: Observable<DocumentData[]>
  col = collection(this.firestore, 'testapp');
  constructor(private firestore: Firestore) {
    this.item$ = collectionData(this.col);

    this.getAll().subscribe(res=>{
      console.log(res);
      this.get("jp6huRCxvLsB9ia4JtHJ").subscribe(r=>console.log('certain id with jp6huRCxvLsB9ia4JtHJ:',r))
    });
  }
  getAll() {
    return collectionData(this.col, {
      idField: 'id',
    }) as Observable<Item[]>;
  }

  get(id: string) {
    const Reference = doc(this.col);
    return docData(Reference, { idField: 'id' });
  }

  create(item: Item) {
    return addDoc(this.col, item);
  }

  update(item: Item) {
    const Reference = doc(
      this.firestore,
      `testapp/${item.id}`
    );
    return updateDoc(Reference, { ...item });
  }

  delete(id: string) {
    const Reference = doc(this.firestore, `testapp/${id}`);
    return deleteDoc(Reference);
  }
  onSubmit(form:Item){
    this.create(form).then(r=>console.log(r));
  }
}
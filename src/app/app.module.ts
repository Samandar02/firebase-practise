import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { FormsModule } from '@angular/forms';
@NgModule({
 declarations: [
   AppComponent
 ],
 imports: [
   BrowserModule,
   FormsModule,
   provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
   provideFirestore(() => getFirestore()),
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }

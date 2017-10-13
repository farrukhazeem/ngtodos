import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireDatabase  } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyCReWg92UdiVZYTKL7N6GiMSqcrZ7q4yyo",
  authDomain: "ngtodo-d3811.firebaseapp.com",
  databaseURL: "https://ngtodo-d3811.firebaseio.com",
  projectId: "ngtodo-d3811",
  storageBucket: "ngtodo-d3811.appspot.com",
  messagingSenderId: "501928283258"
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }

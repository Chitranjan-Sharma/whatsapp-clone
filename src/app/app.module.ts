import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';
import { ChatsComponent } from './components/chats/chats.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ChatsComponent,
    RegisterComponent,
    HomeComponent,
    MyProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyC5SdjjuwjWHo-sd9V8Nx5eiznp0QnFSN0',
      authDomain: 'meetup-f1d55.firebaseapp.com',
      databaseURL: 'https://meetup-f1d55-default-rtdb.firebaseio.com',
      projectId: 'meetup-f1d55',
      storageBucket: 'meetup-f1d55.appspot.com',
      messagingSenderId: '157830304789',
      appId: '1:157830304789:web:499b92d4777dbafe5aea1c',
    }),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

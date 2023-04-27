import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './components/chats/chats.component';
import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'my_profile', component: MyProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

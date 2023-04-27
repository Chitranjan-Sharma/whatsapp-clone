import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(public api: ApiService) {
    api.getAllChats();
    api.LoggedUserData = new UserModel();
    api.CurrentSelectedUser = new UserModel();
  }
  userName: string = '';
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  newUser: boolean = false;
  user: UserModel = new UserModel();

  loginUser() {
    if (this.email.trim() != '') {
      if (this.password.trim()! + '') {
        this.api.loginToUserAccount(this.email, this.password);
      }
    }
  }

  registerUser() {
    if (
      this.email.trim() != '' &&
      this.userName.trim() != '' &&
      this.password.trim() != ''
    ) {
      this.user.userName = this.userName;
      this.user.email = this.email;
      this.user.password = this.password;

      this.api.postUser(this.user);
      this.newUser = false;
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { ChatModal } from '../models/chat-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, public router: Router) {}

  readonly baseUrl = 'http://localhost:4000/api/';

  CurrentSelectedUser: UserModel = new UserModel();
  chatsWithSelectedUser: ChatModal[] = [];

  LoggedUserData: UserModel = new UserModel();
  allUsersList: UserModel[] = [];

  getAllUserList = () => {
    this.http.get(this.baseUrl + 'all-users').subscribe(
      (res) => {
        let response = res as Response;
        this.allUsersList = response.data as UserModel[];
      },
      (err) => {
        console.log(err);
      }
    );
  };

  postUser(user: UserModel) {
    this.http.post(this.baseUrl + 'post-user', user).subscribe(
      (res) => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        this.getAllUserList();
      },
      (err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      }
    );
  }

  errorMessage = '';
  loginToUserAccount(email: string, password: string) {
    this.allUsersList.forEach((user) => {
      if (user.email == email && user.password == password) {
        this.LoggedUserData = user;
        this.CurrentSelectedUser = this.allUsersList[0];

        this.getAllChats();
        this.router.navigate(['']);
        return;
      } else {
        this.errorMessage = 'Incorrect email or password !';
        return;
      }
    });
  }

  getAllChats = () => {
    this.http.get(this.baseUrl + 'get-chats').subscribe(
      (res) => {
        let response = res as Response;
        let chats = response.data as ChatModal[];

        this.chatsWithSelectedUser = [];

        chats.forEach((chat) => {
          if (
            (this.LoggedUserData._id == chat.senderId &&
              this.CurrentSelectedUser._id == chat.receiverId) ||
            (this.CurrentSelectedUser._id == chat.senderId &&
              this.LoggedUserData._id == chat.receiverId)
          ) {
            this.chatsWithSelectedUser.push(chat);
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  updateUserLastMessage() {
    this.http
      .put(
        this.baseUrl + 'update-user/' + this.LoggedUserData._id,
        this.LoggedUserData
      )
      .subscribe((res) => {
        this.http
          .put(
            this.baseUrl + 'update-user/' + this.CurrentSelectedUser._id,
            this.CurrentSelectedUser
          )
          .subscribe((res) => {});
      });
  }

  updateUserData(user: UserModel) {
    this.http
      .put(this.baseUrl + 'update-user/' + user._id, user)
      .subscribe((res) => {
        alert('Profile image updated !');
      });
  }

  postMessage(chat: ChatModal) {
    return this.http.post(this.baseUrl + 'send-message', chat);
  }
}

class Response {
  status = '';
  data = [];
  message = '';
}

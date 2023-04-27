import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  usersList: UserModel[] = [];

  constructor(public api: ApiService) {
    api.getAllUserList();
  }

  selectUser(user: UserModel) {
    this.api.CurrentSelectedUser = user;
    if (this.api.LoggedUserData.email != '') {
      this.api.getAllChats();

      //get the div that contains all the messages

      //make the last element (a message) to scroll into view, smoothly!
    } else {
      alert('Please logging first ?');
    }
  }

  userLogOut() {
    this.api.router.navigate(['register']);
  }
}

import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'whatsapp-clone';

  constructor(private api: ApiService, private router: Router) {
    api.getAllUserList();
  }

  ngOnInit() {
    if (this.api.LoggedUserData.email.trim() == '') {
      this.router.navigate(['register']);
    } else {
      this.router.navigate(['']);
    }
  }
}

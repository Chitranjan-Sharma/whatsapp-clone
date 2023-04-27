import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent {
  constructor(public api: ApiService, private storage: AngularFireStorage) {
    this.user = api.LoggedUserData;
  }

  selectedImageUrl: string = 'assets/image_placeholder.jpg';
  user: UserModel = new UserModel();
  selectedFile: any;

  openImagePicker(e: any) {
    if (e.target.files && e.target.files[0]) {
      this.selectedFile = e.target.files[0];

      const reader = new FileReader();

      reader.onload = (ev) => (this.selectedImageUrl = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage() {
    if (this.selectedFile != null) {
      const filePath = '/ProfileImages/' + this.selectedFile.name;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedFile);

      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe((downloadURL) => {
              this.user.profileImage = downloadURL;
              this.api.updateUserData(this.user);
            });
          })
        )
        .subscribe();
    } else {
      alert(
        'Please select any image or close this window by clicking outside !'
      );
    }
  }

  cancelMessage() {
    this.selectedImageUrl = 'assets/image_placeholder.jpg';
    this.selectedFile = null;
  }
}

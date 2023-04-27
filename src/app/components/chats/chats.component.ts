import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatModal } from 'src/app/models/chat-model';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent {
  constructor(public api: ApiService, private storage: AngularFireStorage) {
    //api.getAllUserList();
  }

  @ViewChild('chatBox')
  chatView!: ElementRef;

  ngAfterViewChecked() {
    this.chatView.nativeElement.scrollTop =
      this.chatView.nativeElement.scrollHeight;
  }

  chat: ChatModal = new ChatModal();

  sendMessage() {
    if (
      this.api.LoggedUserData._id != '' &&
      this.api.CurrentSelectedUser._id != ''
    )
      if (this.chat.message.trim() != '') {
        this.chat.senderId = this.api.LoggedUserData._id;
        this.chat.receiverId = this.api.CurrentSelectedUser._id;
        this.chat.timeStamp = Date.now().toString();

        this.api.postMessage(this.chat).subscribe(
          (res) => {
            this.api.getAllChats();
            this.api.LoggedUserData.lastMessage = this.chat.message;
            this.api.CurrentSelectedUser.lastMessage = this.chat.message;
            this.api.LoggedUserData.messageTime = this.chat.timeStamp;
            this.api.CurrentSelectedUser.messageTime = this.chat.timeStamp;
            this.api.updateUserLastMessage();
            this.chat = new ChatModal();
          },
          (err) => {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
          }
        );
      }
  }

  selectedImageUrl: string = 'assets/image_placeholder.jpg';

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
      const filePath = '/SentAttachments/' + this.selectedFile.name;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedFile);

      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe((downloadURL) => {
              this.chat.imageUrl = downloadURL;
              this.chat.timeStamp = Date.now().toString();
              this.chat.message = this.selectedFile.name;
              this.chat.senderId = this.api.LoggedUserData._id;
              this.chat.receiverId = this.api.CurrentSelectedUser._id;

              this.api.postMessage(this.chat).subscribe(
                (res) => {
                  this.api.getAllChats();
                  this.api.LoggedUserData.lastMessage = this.chat.message;
                  this.api.CurrentSelectedUser.lastMessage = this.chat.message;
                  this.api.updateUserLastMessage();
                  this.chat = new ChatModal();
                },
                (err) => {
                  console.log('====================================');
                  console.log(err);
                  console.log('====================================');
                }
              );
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
    this.chat = new ChatModal();
    this.selectedImageUrl = 'assets/image_placeholder.jpg';
    this.selectedFile = null;
  }
}

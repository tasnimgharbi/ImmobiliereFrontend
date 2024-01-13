import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  selectedFile: File | null = null;
  showUpdateModal = false;
  userId ='';
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

openUpdateModal() {
  this.showUpdateModal = true;
}

closeUpdateModal() {
  this.showUpdateModal = false;
}

  fetchUserDetails() {
    const userId = localStorage.getItem('userid');
    if (!userId) {
      console.error('User ID not found');
      return;
    }
    this.userId= userId;
  
    this.authService.getUserDetails(userId).subscribe(
      (data) => {
        this.user = data.user;
        if (this.user && this.user.userImage) {
          console.log(this.user.userImage);
          this.user.userImage = `http://localhost:8000${this.user.userImage}`;
          console.log(this.user.userImage);
         
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  shouldDisplayNames(): boolean {
    return this.user.firstname !== undefined && this.user.lastname !== undefined;
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File; 
  }

  uploadImage() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    this.authService.uploadUserImage(this.selectedFile).subscribe(
      (data) => {
        console.log('Image uploaded successfully');
        this.user.userImage = data.imagePath;
        location.reload();
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }
  
  updateUser() {
    const userId = localStorage.getItem('userid');
    if (!userId) {
      console.error('User ID not found');
      return;
    }
    const updatedDetails = {
      username: this.user.username,
      email: this.user.email,
      address: this.user.address,
      contactnumber: this.user.contactnumber,
      firstname: this.user.firstname,
      lastname: this.user.lastname

    };

    this.authService.updateUserDetails(userId, updatedDetails).subscribe(
      (data) => {
        console.log('User details updated successfully');
      const newUsername = this.user.username; 
      const storedUserId = localStorage.getItem('userid');
      if (newUsername && storedUserId && storedUserId === userId) {
        localStorage.setItem('username', newUsername);
      }

        this.showUpdateModal = false; 
        this.fetchUserDetails();
      },
      (error) => {
        console.error('Error updating user details:', error);
      }
    );
  }
}

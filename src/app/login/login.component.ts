import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registeredUserData = { username: "", password: "", email: "", contactnumber: "", address: "" };
  loginUserData = { email: "", password: "" };
  loginerr: string = "";
  public userid: string = "";
  emailErrorMessage: string = "";
  usernameErrorMessage: string = "";
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    if (this._auth.loggedIn()) {
      this._router.navigate(['']);
    } else {
      this.route.url.subscribe(url => {
        const disp = this.route.snapshot.paramMap.get('disp');
        this.showSignupOrSignin(disp);
      });
    }
  }


  showSignupOrSignin(disp: string | null) {
    const signinElement = document.querySelector('.signin') as HTMLElement;
    const signupElement = document.querySelector('.signup') as HTMLElement;

    if (disp === "signup") {
      if (signinElement && signupElement) {
        signinElement.style.display = 'none';
        signupElement.style.display = 'block';
      }
    } else {
      if (signinElement && signupElement) {
        signinElement.style.display = 'block';
        signupElement.style.display = 'none';
      }
    }
  }

  signin() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.handleUserData(res.user);
        
  
        if (res.user.isAdmin) {
          this._router.navigate(['/dashboard']).then(() => {
            window.location.reload();
          });
        } else {
          this._router.navigate(['']);
        }
      },
      err => {
        this.loginerr = err.error;
      }
    );
  }
  
  signup() {
   
  
    this._auth.registerUser(this.registeredUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.handleUserData(res.registeredUser);
        this._router.navigate(['']); 
      },
      err => {
        if (err.error === 'Email already exists') {
          this.emailErrorMessage = 'Email is already in use. Please use a different email.';
          this.usernameErrorMessage = '';
        } else if (err.error === 'Username already exists') {
          this.usernameErrorMessage = 'Username is already taken. Please choose another username.';
          this.emailErrorMessage = '';
        } else {
          console.log(err.error);
        }
      }
    );
  }
  

  handleUserData(user: any) {
    localStorage.setItem('userid', user._id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false');
    this.userid = user._id;
  }


}

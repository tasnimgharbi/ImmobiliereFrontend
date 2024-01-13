import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = 'http://localhost:8000/api/register';
  private _loginUrl = 'http://localhost:8000/api/login';
  private _userDetailsUrl = 'http://localhost:8000/api/getUserDetails'; 
  private _uploadUserImageUrl = 'http://localhost:8000/api/uploadUserImage'; 
  private _updateUserUrl = 'http://localhost:8000/api/updateUser';
  private _getUsersUrl = 'http://localhost:8000/api/users';
  private _deleteUserUrl = 'http://localhost:8000/api/users'; 

  
  constructor(private http: HttpClient, private _router: Router) {}

  
  isAdmin(): boolean {
    const isAdmin = localStorage.getItem('isAdmin');
    return isAdmin === 'true';
  }
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    this._router.navigate(['']);
   
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getUserDetails(userId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}` 
    });

    return this.http.get<any>(`${this._userDetailsUrl}/${userId}`, { headers });
  }

  uploadUserImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('userImage', image);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}` 
    });

    return this.http.post<any>(this._uploadUserImageUrl, formData, { headers });
  }
  updateUserDetails(userId: string, updatedDetails: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`, 
      'Content-Type': 'application/json' 
    });

    return this.http.put<any>(`${this._updateUserUrl}/${userId}`, updatedDetails, { headers });
  }
  getUsers(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });

    return this.http.get<any>(this._getUsersUrl, { headers });
  }

  deleteUser(userId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}` 
    });

    return this.http.delete<any>(`${this._deleteUserUrl}/${userId}`, { headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private addUrl = 'http://localhost:8000/api/addhouse';
  private getHouses = 'http://localhost:8000/api/houses';
  private getHouseByIdUrl = 'http://localhost:8000/api/house';
  private updateHouseUrl = 'http://localhost:8000/api/updateHouse'; 
  private uploadImagesUrl = 'http://localhost:8000/api/updateHouseImages'; 
  private deleteHouseUrl = 'http://localhost:8000/api/deleteHouse'; 

  private searchLocation: string = ''; 

  constructor(private http: HttpClient) {}

  setSearchLocation(location: string): void {
    this.searchLocation = location;
  }

  getSearchLocation(): string {
    return this.searchLocation;
  }

  addHouse(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token'); 
   
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.addUrl, formData, { headers });
  }
  getAllHouses(): Observable<any> {
    return this.http.get<any>(this.getHouses);
  }
  getHouseById(id: string): Observable<any> {
    const url = `${this.getHouseByIdUrl}/${id}`; 
    return this.http.get<any>(url);
  }

  updateHouse(id: string, updatedDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    const url = `${this.updateHouseUrl}/${id}`;
    return this.http.put(url, updatedDetails, { headers });
  }
  
uploadHouseImages(id: string, images: File[]): Observable<any> {
  const formData = new FormData();

  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      formData.append(`image${i + 1}`, images[i], images[i].name);
    }
  }

  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  const url = `${this.uploadImagesUrl}/${id}`;
  return this.http.put(url, formData, { headers });
}
deleteHouse(houseId: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
  });

  const url = `${this.deleteHouseUrl}/${houseId}`;
  return this.http.delete(url, { headers });
}



}

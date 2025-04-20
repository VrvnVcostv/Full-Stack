import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CloudinaryService {
  private cloudName = 'angular_upload';
  private uploadPreset = 'angular_upload';

  constructor(private http: HttpClient) {}

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'angular_upload'); // 🔥 importante

    const url = `https://api.cloudinary.com/v1_1/dcnacn1dw/image/upload`;

    return this.http.post(url, formData);
  }
}

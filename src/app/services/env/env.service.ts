import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://localhost:8085';
  //API_URL = 'http://192.168.0.104:8080';

  constructor() { }
}

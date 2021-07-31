import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';

export const baseUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }



  saveuser(user): Observable<string>{

    return this.http.post<string>(baseUrl + 'users/save' , user);
  }

  // @ts-ignore
  getallusers(token): Observable<User[]>{
    // @ts-ignore
    const a = 'Authorization';
    const b = 'Accept';
    const header = {
      a: 'Bearer ' + token,
      b: 'application/json'};
    const option = {headers: new Headers(header)};
      // @ts-ignore
    return  this.http.get<User[]>(baseUrl + 'users/all', option);
  }
}

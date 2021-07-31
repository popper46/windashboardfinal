import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../model/user';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public afAuth: AngularFireAuth, public userService: UserService) { }

  SignUp(email, password): void {
     this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        //  console.log(result);
        result.user.getIdToken().then((token) => { console.log(token);
                                                   const user = new User();
                                                   user.email = email;
                                                   user.uid = result.user.uid;
                                                   user.firebasetoken = token;
                                                   user.role = 'ADMIN';
                                                   this.userService.saveuser(user).subscribe( res => {console.log(res); }); });


      }).catch((error) => {
        console.log(error.message);
      });
  }

  SignIn(email, password): void{
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {

        result.user.getIdToken().then((token) => { console.log(token); this.userService.getallusers(token).subscribe( ris => {console.log(ris); });});


      }).catch((error) => {
       console.log(error.message);
      });
  }
}

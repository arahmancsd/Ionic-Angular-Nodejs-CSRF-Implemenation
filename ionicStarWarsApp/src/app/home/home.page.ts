import { Component } from '@angular/core';
import { AuthServices } from '../AuthService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  result = '';
  constructor(private auth: AuthServices) {}
  CallMe(){
    this.auth.ValidateReference({payload: 'payload'}).subscribe(res => {
      this.result = res;
    }, err =>
    {
      this.result = `error ${err.message}`;
    });
  }
}

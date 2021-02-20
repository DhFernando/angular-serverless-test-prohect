import { Component, OnInit } from '@angular/core';

import {HeroService} from '../../services/hero.service'

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.scss']
})
export class Comp2Component implements OnInit {

  email:string='';
  password:string='';
  constructor(private service:HeroService) { }

  ngOnInit(): void { 
     this.service.isAuthenticated() 
  }

  submit(){
    if(this.email && this.password){
      this.service.signIn(this.email , this.password)
    }
  }

  logout(){
    this.service.logOutUser()
  }
}

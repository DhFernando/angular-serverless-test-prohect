import { Component, OnInit } from '@angular/core';

import {HeroService} from '../../services/hero.service'

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit {
  email:string ="";
  password:string ="";
  conPass:string ="";
  username:string="";
  confirmEmail:string = "";
  varificationCode : string = "";
   
  constructor(private service:HeroService) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.password == this.conPass){
      this.service.signUp(this.username, this.email , this.conPass)
    }
  }

  confirm(){
    this.service.confirmUser(this.confirmEmail , this.varificationCode)
  }

}

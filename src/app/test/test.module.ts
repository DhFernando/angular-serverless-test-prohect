import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';

import { CompComponent } from '../comp/comp.component'

import { FormsModule ,  ReactiveFormsModule } from '@angular/forms'

import  { HeroService } from '../services/hero.service';


@NgModule({
  declarations: [TestComponent, Comp1Component, Comp2Component ,CompComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[HeroService]
})
export class TestModule { }

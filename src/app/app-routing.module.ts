import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompComponent } from './comp/comp.component';

const routes: Routes = [
  { path: '', component: CompComponent },
  { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'pc', loadChildren: () => import('./pc/pc.module').then(mod => mod.PcModule) },
  { path: 'h5', loadChildren: () => import('./h5/h5.module').then(mod => mod.H5Module) },
  { path: '**', redirectTo: 'pc', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

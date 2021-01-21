import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'breed-detail/:breedId',
    loadChildren: () => import('./breed-detail/breed-detail.module').then( m => m.BreedDetailPageModule)
  },
  {
    path: 'search-detail',
    loadChildren: () => import('./search-detail/search-detail.module').then( m => m.SearchDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

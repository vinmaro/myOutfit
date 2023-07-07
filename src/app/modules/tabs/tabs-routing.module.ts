import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tabs/search',
        loadChildren: () =>
          import('../search/search.module').then((m) => m.SearchPageModule),
      },
      {
        path: 'tabs/home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'tabs/news',
        loadChildren: () =>
          import('../news/news.module').then((m) => m.NewsPageModule),
      },
      {
        path: 'tabs/dresses',
        loadChildren: () =>
          import('../dresses/dresses.module').then((m) => m.DressesPageModule),
      },
      {
        path: 'tabs/outfit',
        loadChildren: () =>
          import('../outfit/outfit.module').then((m) => m.OutfitPageModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

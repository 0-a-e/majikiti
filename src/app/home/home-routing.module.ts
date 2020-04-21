import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
const routes: Routes = [
    {
        path: 'home', component: HomePage, children: [
            {
                path: '', loadChildren: () => import('../top/top.module').then(m=>m.TopPageModule)
            },
            {
                path: 'home', loadChildren: () => import('../top/top.module').then(m=>m.TopPageModule)
            },
            {
                path: 'star', loadChildren: () => import('../top/top.module').then(m=>m.TopPageModule)
            }
        ]
    }, {
      path:'',
      redirectTo:'/home/home',
      pathMatch:'full'
    }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
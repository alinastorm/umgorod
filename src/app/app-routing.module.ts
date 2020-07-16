import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './Sections/map/map.component';
import { AdminComponent } from './Sections/Admin/admin.component';
import { MainComponent } from './Sections/main/main.component';
import { AboutComponent } from './Sections/about/about.component';
import { CitiesComponent } from './Sections/cities/cities.component';


const routes: Routes = [

  { path: '', component: MainComponent},
  
  {
    path: 'main', component: MainComponent,
  },
  {
    path: 'map', component: MapComponent,
  },
  {
    path: 'cities', component: CitiesComponent,
  },
  {
    path: 'admin', component: AdminComponent,
  },
  { path: 'about',component: AboutComponent,
}
//   { path: 'admin',
//   loadChildren: () => import('./Sections/Admin/admin-routing.module').then(m => m.AdminRoutingModule)
// }
  // loadChildren: './sections/Admin/admin-routing.module#MainRoutingModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


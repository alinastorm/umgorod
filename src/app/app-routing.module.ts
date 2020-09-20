import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './Sections/map/map.component';
import { AdminComponent } from './Sections/Admin/admin.component';
import { MainComponent } from './Sections/main/main.component';
import { AboutComponent } from './Sections/about/about.component';
import { CitiesComponent } from './Sections/cities/cities.component';
import { CityComponent } from './Sections/cities/city/city.component';
import { PeopleComponent } from './Sections/people/people.component';
import { HumanComponent } from './Sections/people/human/human.component';
import { TopicsComponent } from './Sections/topics/topics.component';
import { TopicComponent } from './Sections/topics/topic/topic.component';
import { MarkersComponent } from './Sections/map/markers/markers.component';
import { ContactsComponent } from './Sections/contacts/contacts.component';
import { PartnersComponent } from './Sections/partners/partners.component';


const cityRoutes: Routes = [
  {
    path: ':id', component: CityComponent,
  },
]
const humanRoutes: Routes = [
  {
    path: ':id', component: HumanComponent,
  },
]
const topicRoutes: Routes = [
  {
    path: ':id', component: TopicComponent,
  },
]
// const mapRoutes: Routes = [
//   {
//     path: ':id', component: MapComponent,
//   },
// ]

const routes: Routes = [

  { path: '', component: MainComponent },

  {
    path: 'main', component: MainComponent,
  },
  {
    path: 'cities', component: CitiesComponent, children: cityRoutes
  },
  {
    path: 'people', component: PeopleComponent, children: humanRoutes
  },

  {
    path: 'topics', component: TopicsComponent, children: topicRoutes
  },
  {
    path: 'map', component: MapComponent
    // ,children: mapRoutes
  },

  // {
  //   path: 'map', component: MapComponent
  // },
  {
    path: 'admin', component: AdminComponent,
  },
  { path: 'partners', component: PartnersComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent }
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


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ImagePageComponent } from './image-page/image-page.component';

const routes: Routes = [
  { path: '', component: MainComponent }, // Default route
  { path: 'image-page', component: ImagePageComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }
  // Additional routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

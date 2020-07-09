import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageuploaderComponent } from './imageuploader/imageuploader.component';
import { CsvuploaderComponent } from './csvuploader/csvuploader.component';


const routes: Routes = [
  {
    path:'csv',component:CsvuploaderComponent
  },
  {
    path:'image',component:ImageuploaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ImagePageComponent } from './image-page/image-page.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ImagePageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

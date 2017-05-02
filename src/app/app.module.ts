import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { Home } from '../pages/home/home';
import { NotePage } from '../pages/note/note';
import { TabsPage } from '../pages/tabs/tabs';
import { GetProviders } from '../providers';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';



const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '8e85882e'
  }
};


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    Home,
    NotePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AceEditorModule,
    CloudModule.forRoot(cloudSettings),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    Home,
    NotePage, 
  ],
  providers: GetProviders(), 
})
export class AppModule {}

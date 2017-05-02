import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotePage } from './note';

@NgModule({
  declarations: [
    NotePage,
  ],
  imports: [
    IonicPageModule.forChild(NotePage),
  ],
  exports: [
    NotePage
  ]
})
export class NoteModule {}

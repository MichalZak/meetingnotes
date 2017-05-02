import { Component } from '@angular/core';
import { Home } from '../home/home';
import { NotePage } from '../note/note';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Home;
  //tab2Root = NotePage;
  tab2Root = "About";

  constructor() {

  }
}

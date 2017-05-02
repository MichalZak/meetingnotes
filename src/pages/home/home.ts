import { Component, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import * as _ from "lodash";
import * as moment from 'moment';
import { Note } from '../../models';
import { NotePage } from '../note/note';
import { DataProvider } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  public notes:Note[];
  public subscription:any;



  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ref: ChangeDetectorRef,
              public alertCtrl: AlertController,
              public dataProvider: DataProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
    this.subscription = this.dataProvider.getDocsObservable('note').subscribe(
      docs =>{
        this.notes = _.sortBy(docs, ['_id']);
        this.notes = this.notes.map(doc=>new Note(doc));
        this.ref.markForCheck();
      },
      err =>{
        //onError
        console.log(err);
      },
      () =>{
        //onComplted
        console.log("Subscription Completed");
      }
    );
  }

 view(id:string = null){
    this.navCtrl.push(NotePage,{id:id});
 }

 add(){
    this.view();
 }

remove(item:any){
    console.log("Remove Note", item);
    let prompt = this.alertCtrl.create({
      title: 'Remove Note',
      message: "Are you sure you want to remove this note?",
      buttons: [
        {
          text: 'Cancel',
          handler: data=>{}//do nothing, just leave
        },
        {
          text: 'Remove',
          handler: data => {
            this.dataProvider.remove(item)
          }
        }
      ]
    });
    prompt.present();
  
  }
}

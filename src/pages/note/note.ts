import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef} from '@angular/core';
import { IonicPage,NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Note } from '../../models';
import { DataProvider } from '../../providers';
import { generateId, delay } from '../../utils';
import * as _ from "lodash";
import * as moment from 'moment';
import { Keyboard } from '@ionic-native/keyboard';

import 'brace';
import 'brace/theme/dreamweaver';
import 'brace/mode/markdown';



@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotePage {
  @ViewChild('editor') editor;
  public note:Note = new Note();
  public oldNote:Note;

  public subscription:any;



  constructor(public navCtrl: NavController,
              public keyboard: Keyboard, 
              public alertCtrl: AlertController,
              public dataProvider: DataProvider,
              public toastCtrl: ToastController,
              private ref: ChangeDetectorRef,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Home');
    this.editor.setTheme("dreamweaver");
    

    this.editor.getEditor().setOptions({
            enableBasicAutocompletion: true,
            showGutter:false,
    });

    //this.editor.getEditor().insert('test........');
    //this.editor.getEditor().setUseWrapMode(true);
    this.editor.getEditor().setHighlightActiveLine(true);
  }

  ionViewDidEnter(){
    console.log("IonViewDidEnter: ", this.note);
    this.ref.markForCheck();  
    this.keyboard.show();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter: ", this.note);
    let id = this.navParams.get('id');
    if(!id){
      this.create();
    }
    else {
      this.subscribe(id);
    }

    let tabBarElement:any = document.querySelector('.tabbar.show-tabbar');
    tabBarElement.style.display = 'none';
    this.ref.markForCheck(); 
  } 

  ionViewWillLeave(){
    this.save(); 
    this.subscription.unsubscribe();
    this.keyboard.close();
    let tabBarElement:any = document.querySelector('.tabbar.show-tabbar');
    tabBarElement.style.display = 'flex';
  }

  async create(){
      console.log("We are creating note");
      let date:string = moment().format('YYYY/MM/DD');
      let message:string = "Theme: \nDate: "+ date+"\n================\n\n";


      let nn = await this.dataProvider.save(new Note({date: date, 
                                                      body: message,
                                                      type: 'note',
                                                      _id: generateId('note')}));
      console.log("Craeted Note Result", nn);
      
      if(!nn.id)
        this.navCtrl.pop();//maybe have a message here, we failed to crate
      else
      {
        await delay(300);
        this.subscribe(nn.id);
      }
        
  }


  subscribe(id:string){
    this.subscription = this.dataProvider.getDocObservable(id).subscribe(
      doc =>{
        try{
          console.log("Viewing Note Detail ", doc);
          this.note = new Note(Object.assign({}, doc));
          this.oldNote = new Note(Object.assign({}, doc));
          this.editor.getEditor().setValue(this.note.body);
          this.ref.markForCheck();
        }
        catch(e){
          console.log(e)
          this.navCtrl.pop();
        }
      }
    ); 
  }

  save(){
    //are we saving?
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$Are we saving?");
    let message = this.editor.getEditor().getValue();
    this.note.body = message;
    let theme;
    let date;
    let i =  message.indexOf("\n");
    
    
    try{
      theme = message.substr(6, i-6).trim();
    }
    catch(e){
      theme = "";
    }
    try{
      let ii =  message.indexOf("\n", message.indexOf("\n")+1);
      
      date = message.substr(i + 5,ii-i-5).trim();
    }catch(e){
      date = "";
    }
    this.note.theme = theme;
    this.note.date = date;

    if(_.isEqual(this.note, this.oldNote))
      return; //no changes have been make, no need to save
    
    console.log("Yes we are: ", this.note);
    this.dataProvider.save(this.note);
  }

  onChange(e){
    console.log(e);
    this.ref.markForCheck();  
  }

  getTitle():string{
     return this.note.theme || 'Note'; 
  }
  


}

import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  text: String;
  tag: String;
  tags: String[] = new Array();
  constructor(private db:AngularFireDatabase,private alert:AlertController) { }
  async addtags() {
    this.tags.push(this.tag);
    this.tag = "";
  }
  delete(i) {
    console.log(i);
    this.tags.splice(i,1);
  }
  async post() {
    const itemlist = this.db.list('list');
    const appenddict = {
      "text": this.text,
      "tags": this.tags,
      "verify": true
    }
    console.log(appenddict);
    itemlist.push(appenddict);
    const alert = await this.alert.create({
      header: '追加しました。',
      message: '(՞ةڼ )',
      buttons: ['OK']
    });

    await alert.present();
  }
  
  ngOnInit() {
  }

}

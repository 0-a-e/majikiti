import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @Input() tag: string[] = new Array();
  @Input() msg: String;
  @Input() index: any;

  select: String;
  text: String;
  constructor(public mc: ModalController,public ac:AlertController,private db:AngularFireDatabase) { }

  selecter(ev) {
    this.select = ev["detail"]["value"];
  }

  closemodal() {
    console.log("closemodal");
    this.mc.dismiss({'dismissed': true});
}
async post() {
  const itemlist = this.db.list('report');
  const appenddict = {
    "text": this.msg,
    "tags": this.tag,
    "index": this.index,
    "category": this.select,
    "reason": this.text
  }
  console.log(appenddict);
  itemlist.push(appenddict);
  const alert = await this.ac.create({
    header: '報告が完了しました。',
    message: '最長で半年ほどで反映されます。',
    buttons: ['OK']
  });

  await alert.present();
  this.closemodal();
}

  ngOnInit() {}

}

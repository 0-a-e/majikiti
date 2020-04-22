import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Route, Router, Routes, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-top',
  templateUrl: './top.page.html',
  styleUrls: ['./top.page.scss'],
})
export class TopPage implements OnInit {
  message: any;
  messagebase: any;
  constructor(private router: Router,private route:ActivatedRoute,private db:AngularFireDatabase,private modal:ModalController,private alert:AlertController) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.db.list('list').valueChanges().subscribe(data=> {
      this.message = data.reverse();
      this.messagebase = data.reverse();
    });
  }
  opendetail(index) {
    console.log(index);
    this.router.navigateByUrl(`/message/${index}`);
  }
  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  async search(ev) {
    //console.log(ev.target.value);
    console.log(this.message);
    this.message = this.filterItems(this.messagebase, ev.target.value);
  }
  filterItems(arr, query) {
    return arr.filter(function (el) {
      return el.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
  }
}

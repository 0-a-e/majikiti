import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  constructor(private router: Router, private storage: Storage) { }
  message: any;
  ionViewWillEnter() {
    this.getfavorite();
  }
  getfavorite() {
    this.storage.get('favorite').then((val) => {
      console.log(val);
      if (val) {
        this.message = val;
      }
    });
  }
  opendetail(index) {
    console.log(index);
    this.router.navigateByUrl(`/favmsg/${index}`);
  }
  ngOnInit() {
  }

}

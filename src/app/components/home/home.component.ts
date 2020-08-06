import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from './../../data.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users = [];

  @ViewChild('myaccordion') myPanels: MatAccordion;
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
      this.dataService.AllUsers = this.users;
    });
  }

  onSelectedOption(e) {
    this.users = e;
    this.users = this.users.length !== undefined ? this.users : [this.users];
    this.myPanels.closeAll();
  }

}

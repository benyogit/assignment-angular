import { Component, OnInit, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy {

  isUserAuthenticated = false;


  constructor() {}

  ngOnInit() {

  }
  ngOnDestroy() {

  }

  onLogout() {

  }
}



// app.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'ngx-spinner';
import 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateBackgroundColor();
      }
    });
  }

  private updateBackgroundColor(): void {
    const currentRoute = this.router.url;

    // Set background color based on the current route
    switch (currentRoute) {
      case '/login':
        this.setBackgroundColor('linear-gradient(45deg, #0074D9, #00A5D9, #00D4D9)');
        break;
      case '/register':
        this.setBackgroundColor('linear-gradient(45deg, #0074D9, #00A5D9, #00D4D9)');
        break;
      default:
        this.setBackgroundColor('#e8e8e8');
        break;
    }
  }

  private setBackgroundColor(color: string): void {
    document.body.style.background = color;

  }
}

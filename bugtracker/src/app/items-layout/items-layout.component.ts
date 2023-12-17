import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-items-layout',
  templateUrl: './items-layout.component.html',
  styleUrls: ['./items-layout.component.css']
})
export class ItemsLayoutComponent {
  @Input() tableHeaders: { [key: string]: string } = {};

  ObjectKeys: string[] = [];

  projects: any[] = [];

  constructor() { }

  ngOnInit(): void {

    this.ObjectKeys = Object.keys(this.tableHeaders);


  }


}

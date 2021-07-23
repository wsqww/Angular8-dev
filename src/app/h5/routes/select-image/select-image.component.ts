import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss']
})
export class SelectImageComponent implements OnInit {

  constructor() { }

  public files = [];

  ngOnInit() {
  }

  selectedImage($event) {
    console.log($event.target.files);

    this.files = $event.target.files;
  }

}

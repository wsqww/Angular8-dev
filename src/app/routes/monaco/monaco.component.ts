import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as monaco from 'monaco-editor';
// import monaco from 'monaco-editor';

@Component({
  selector: 'app-monaco',
  templateUrl: './monaco.component.html',
  styles: [
    `.editor-main {
      position: relative;
      width: 100%;
      height: 200px;
      border: 1px solid #000;
    }`
  ]
})
export class MonacoComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createEditor();
  }

  createEditor() {
    const editDom = document.getElementById('editor');
    monaco.editor.create( editDom, {
      theme: 'vs-dark',
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'typescript'
    });
  }

}

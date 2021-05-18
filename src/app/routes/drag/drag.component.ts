import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss']
})
export class DragComponent implements OnInit {

  constructor() { }

  public list = [
    { name: 'A', options: ['A0', 'A1', 'A2', 'A3', 'A4'] },
    { name: 'B', options: ['B0', 'B1', 'B2', 'B3', 'B4'] },
    { name: 'C', options: ['C0', 'C1', 'C2', 'C3', 'C4'] },
  ];

  public dropStartIndex = 0;
  public dropStartParentIndex = 0;

  ngOnInit() {
  }

  onDragStart(parentIndex, event, index) {
    this.dropStartParentIndex = parentIndex;
    this.dropStartIndex = index;
    // console.log('start', index, event);
    event.target.classList.add('drag-over');
  }

  onDragEnd(event, index) {
    // console.log('end', index);
    event.preventDefault();
    event.target.classList.remove('drag-over');
  }

  onDragOver(event) {
    // console.log('over');
    event.preventDefault();
  }

  onDrop(parentIndex, event, index) {
    // console.log(this.dropStartParentIndex, parentIndex);
    // console.log('drop', this.dropStartIndex, index);
    event.preventDefault();
    if (this.dropStartParentIndex !== parentIndex) { return false; }
    this.list[parentIndex].options = this.arrSwapItem(this.list[parentIndex].options, this.dropStartIndex, index);
  }

  arrSwapItem(arr, fromIndex, toIndex) {
    const delItem = arr.splice(fromIndex, 1)[0];
    arr.splice(toIndex, 0, delItem);
    // console.log(arr);
    return arr;
  }

}

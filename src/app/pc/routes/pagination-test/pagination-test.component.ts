import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination-test',
  template: `<p>pagination-test works!</p>
            <div class="pagination-test">
              <app-pagination [pageInfo]="pageInfo" (pageChange)="pageChange($event)"></app-pagination>
            </div>`,
  styles: [
    `.pagination-test {
      margin-top: 20px;
      padding: 10px 0;
      background-color: #f6f7fb;
    }`
  ],
})
export class PaginationTestComponent implements OnInit {

  constructor() { }

  public pageInfo = {
    dataTotal: 120,
    pageCurrent: 2,
    pageTotal: 100,
  };

  ngOnInit() {
  }

  pageChange(info) {
    console.log(info);
  }

}

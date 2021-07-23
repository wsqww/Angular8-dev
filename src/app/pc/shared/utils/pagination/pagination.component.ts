import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  @Input()
  set pageInfo(data) {
    this.pageData = {
      dataTotal: data.dataTotal,
      pageCurrent: data.pageCurrent,
      pageTotal: data.pageTotal,
    };
    this.setShowPages(data.pageCurrent);
    this.jumpPage.setValue(data.pageCurrent);
  }

  @Output() pageChange: EventEmitter<{pageSize: number, page: number}> = new EventEmitter();

  public pageSize = [12, 24, 48];
  public selectedPageSize = 12;
  public morePageSize = false;

  public pageData = {
    dataTotal: 0,
    pageCurrent: 0,
    pageTotal: 0,
  };

  public showPages = [];
  public jumpPage = new FormControl(0);

  ngOnInit() {
  }

  /**
   * 选择每页显示数据数量
   */
  toggleMorePageSize() {
    this.morePageSize = !this.morePageSize;
  }

  selectPageSize(size) {
    this.selectedPageSize = size;
    this.toggleMorePageSize();
    this.pageChangeOutput();
  }

  /**
   * 页码 选择
   * @param p 选择的页码
   */
  pageSelect(p) {
    if (!p) { p = 1; }
    p = Number(p);
    p = p < 1 ? 1 : (p > this.pageData.pageTotal ? this.pageData.pageTotal : p);
    // console.log(p);
    if (p === this.pageData.pageCurrent) { return; }
    this.pageData.pageCurrent = p;
    this.jumpPage.setValue(p);
    this.setShowPages(p);
    this.pageChangeOutput();
  }

  /**
   * 设置 需要显示的页码，显示 5个
   * @param p 当前页码
   */
  setShowPages(p) {
    const pages = [];
    if (this.pageData.pageTotal < 5) {
      for (let i = 1; i <= this.pageData.pageTotal; i++) {
        pages.push(i);
      }
    } else {
      let pageStart = 1;
      if ( p <= 3 ) {
        pageStart = 1;
      } else if (p >= this.pageData.pageTotal - 2) {
        pageStart = this.pageData.pageTotal - 4;
      } else {
        pageStart = p - 2;
      }
      for (let i = 0; i < 5; i++) {
        pages.push(pageStart + i);
      }
    }

    this.showPages = pages;
  }

  /**
   * 发射事件
   */
  pageChangeOutput() {
    this.pageChange.emit({
      pageSize: this.selectedPageSize,
      page: this.pageData.pageCurrent
    });
  }

}

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { PagerService } from 'src/app/services/pager.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pageSize = 0;
  @Input() length = 0;
  @Input() pageIndex = 1;
  @Output() page = new EventEmitter();

  pager: any = {};
  next_page = 5;
  constructor(private pagerService: PagerService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.setPage(this.pageIndex);
  }

  setPage(page: any) {
    this.pager = this.pagerService.getPager(this.length, page, this.pageSize);
  }

  choosepage(page: any, step?: any) {
    if (!step) {
      if (page > this.pager.endPage || page < this.pager.startPage) {
        return;
      }
      if (page === '...') {
        page = this.pageIndex + 2;
      }

      if (this.pageIndex != page) {
        this.page.emit(page);
      }
    }
    if (step && step === 'last') {
      let lastPage =
        page + this.next_page > this.pager.totalPages
          ? this.pager.totalPages
          : page + this.next_page;
      this.page.emit(lastPage);
      this.setPage(lastPage);
    }
    if (step && step === 'home') {
      let homePage = page - this.next_page > 0 ? page - this.next_page : 1;
      this.page.emit(homePage);
      this.setPage(homePage);
    }
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { CONFIGS, ROUTERS } from 'src/app/@common/core.constants';
import { IItemGroupFilterType } from 'src/app/@interfaces/table.interface';
import { UtilService } from 'src/app/services/util.service';
import { CommonHelper } from 'src/app/utils/common.helper';
import { nFormatter } from 'src/app/utils/functions';
import { ConfigService } from '../../services/prduct.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  dataSource: any = [];
  groupFilters: IItemGroupFilterType[] = [];

  sort: Sort[] = [{ active: 'Created', direction: 'desc' }];

  includes = [];
  paging: PageEvent = {
    pageIndex: 1,
    pageSize: 3,
    length: 0,
  };

  constructor(
    private commonHelper: CommonHelper,
    private configSvc: ConfigService,
    private utilSvc: UtilService,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.getDataTable();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const nativeElement = this.el.nativeElement;
    const scrollPosition = window.scrollY + window.innerHeight;
    const elementOffset = nativeElement.offsetTop + nativeElement.offsetHeight;

    if (scrollPosition >= elementOffset) {
      this.paging.pageIndex++;
      this.getDataTable();
    }
  }

  //#region Init Data
  getDataTable() {
    this.commonHelper.blockUI();
    this.configSvc
      .getViewPaging(this.paging, this.groupFilters, this.sort, this.includes)
      .subscribe(
        (result: any) => {
          this.paging.length = result.rowCount;
          let data = this.convertDataToTable(result.data);
          if (this.dataSource.length <= 0) this.dataSource = data;
          else this.dataSource = this.dataSource.concat(data);
          this.commonHelper.unBlockUI();
        },
        (err) => {
          this.utilSvc.handleCallApiError(err);
        },
      );
  }

  convertDataToTable(data: any) {
    let tmp: any = [];
    data.forEach((e: any) => {
      tmp.push({
        id: e.id,
        linkAvatar:
          'https://localhost:7041/api/movies/download?fileUrl=' + e.linkAvatar ||
          'assets/img/banner.png',
        linkVideo:
          'https://localhost:7041/api/movies/download?fileUrl=' + e.linkVideo ||
          'assets/img/banner.png',
        name: e.name,
        countLike: e.countLike,
        countDisLike: e.countDisLike,
      });
    });
    return tmp;
  }
  //#endregion

  onLikeVideo(id: string, like: boolean) {
    this.configSvc.likeMovie(id, like).subscribe(
      (result: any) => {
        let movie = this.dataSource.find((a: any) => a.id == id);
        movie.countLike = result.data.countLike;
        movie.countDisLike = result.data.countDisLike;
      },
      (err) => {
        this.utilSvc.handleCallApiError(err);
      },
    );
  }

  changePageSize(page: any) {
    this.paging.pageIndex = page;
    this.getDataTable();
    window.scroll({ top: 240, behavior: 'smooth' });
  }
}

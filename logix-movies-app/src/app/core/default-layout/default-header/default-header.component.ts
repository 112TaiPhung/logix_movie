import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CURRENT_USER, PAGE_LOGIN, ROUTERS } from 'src/app/@common/core.constants';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommonHelper } from 'src/app/utils/common.helper';
import { IS_COLLAPSE_SIDEBAR } from '../side-nav/side-nav.component';
import { navItems } from '../side-nav/_nav';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent implements OnInit {
  @Output() emitSidebar = new EventEmitter();
  isCollapseSidebar = localStorage.getItem(IS_COLLAPSE_SIDEBAR) === 'true' || false;
  navItems = navItems;
  breadcrums: {
    name: String;
    url: String;
  }[] = [];

  user: any;
  readonly ROUTERS = ROUTERS;

  constructor(
    private router: Router,
    private commonHelper: CommonHelper,
    private authService: AuthService,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.breadcrums = [
          {
            name: 'Trang chủ',
            url: `/${ROUTERS.ADMIN.BASE}`,
          },
        ];
        this.navItems.forEach((nav: any) => {
          if (nav.url) {
            if (router.url.includes(nav.url)) {
              this.breadcrums.push(nav);
            }
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(CURRENT_USER) || '');
  }

  logout() {
    this.authService.removeStorage();
    this.router.navigate([`/${PAGE_LOGIN}`]);
    this.authService.logout().subscribe();
  }

  toggleSidebar(value: boolean) {
    this.isCollapseSidebar = value;
    this.emitSidebar.emit(this.isCollapseSidebar);
    localStorage.setItem(IS_COLLAPSE_SIDEBAR, value.toString());
  }
}

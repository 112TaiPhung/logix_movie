import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { IS_COLLAPSE_SIDEBAR, SideNavComponent } from './side-nav/side-nav.component';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  @ViewChild('headerComp') headerComp!: DefaultHeaderComponent;
  @ViewChild('sidenavComp') sidenavComp!: SideNavComponent;

  constructor() {}

  ngOnInit(): void {}

  getSidebar($event: boolean) {
    this.sidenavComp.isCollapseSidebar = $event;
    this.headerComp.isCollapseSidebar = $event;
  }
}

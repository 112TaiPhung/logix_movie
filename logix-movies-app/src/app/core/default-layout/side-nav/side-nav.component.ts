import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CONFIGS } from 'src/app/@common/core.constants';
import { ConfigService } from 'src/app/views/user/homepage/services/prduct.service';
import { navItems } from './_nav';

export const IS_COLLAPSE_SIDEBAR = 'isCollapseSidebar';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Output() emitSidebar = new EventEmitter();
  isCollapseSidebar = localStorage.getItem(IS_COLLAPSE_SIDEBAR) === 'true' || false;
  navItems = navItems;
  panelOpenState = false;
  configsInfo = {
    logo: '',
    logoMini: '',
  };

  constructor(private configSvc: ConfigService) {}

  ngOnInit(): void {}

  toggleSidebar(value: boolean) {
    this.isCollapseSidebar = value;
    this.emitSidebar.emit(this.isCollapseSidebar);
    localStorage.setItem(IS_COLLAPSE_SIDEBAR, value.toString());
  }
}

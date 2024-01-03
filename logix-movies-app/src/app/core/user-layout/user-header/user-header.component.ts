import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CONFIGS,
  CURRENT_USER,
  PAGE_LOGIN,
  ROUTERS,
  STATUS_NOTIFY_TYPE,
} from 'src/app/@common/core.constants';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommonHelper } from 'src/app/utils/common.helper';
import { encodePwd } from 'src/app/utils/functions';
import { ConfigService } from 'src/app/views/user/homepage/services/prduct.service';
import { DialogChangePasswordComponent } from './dialog-change-password/dialog-change-password.component';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit {
  isToggleMenu = false;
  isShowHeader = false;
  user: any;
  navItems = [
    {
      name: 'Sản phẩm',
      url: ROUTERS.USER.BASE,
    },
    {
      name: 'Giới thiệu',
      url: ROUTERS.USER.INTRODUCE,
    },
    {
      name: 'Tin tức',
      url: ROUTERS.USER.NEWS,
    },
  ];

  configsInfo = {
    logo: '',
  };

  constructor(
    private commonHelper: CommonHelper,
    private router: Router,
    private authService: AuthService,
    private configSvc: ConfigService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(CURRENT_USER) || '');
    this.configSvc.configInfo$.subscribe((res: any) => {
      if (res.length) {
        res.forEach((e: any) => {
          switch (e.code) {
            case CONFIGS.LOGO:
              this.configsInfo.logo = e.value;
              break;

            default:
              break;
          }
        });
      }
    });
  }

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    let scrollTop = document.documentElement.scrollTop;
    this.isShowHeader = scrollTop > 300;
  }

  changePassword() {
    const dialogDeleteSingle = this.dialog.open(DialogChangePasswordComponent);
    dialogDeleteSingle
      .afterClosed()
      .subscribe((res: { currentPassword: string; password: string; confirmPassword: string }) => {
        if (res?.password) {
          this.commonHelper.blockUI();
          let user: any = JSON.parse(localStorage.getItem(CURRENT_USER) || '');
          let body = {
            userId: user.id,
            currentPassword: encodePwd(res.currentPassword),
            newPassword: encodePwd(res.password),
          };
        }
      });
  }

  logout() {
    this.authService.removeStorage();
    this.router.navigate([`/${PAGE_LOGIN}`]);
    this.authService.logout().subscribe();
  }
}

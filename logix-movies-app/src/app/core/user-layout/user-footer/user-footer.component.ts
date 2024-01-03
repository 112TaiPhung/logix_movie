import { Component, OnInit } from '@angular/core';
import { CONFIGS } from 'src/app/@common/core.constants';
import { ConfigService } from 'src/app/views/user/homepage/services/prduct.service';
import { DialogCreateMovieComponent } from './dialog-create-movie/dialog-create-movie.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonHelper } from 'src/app/utils/common.helper';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss'],
})
export class UserFooterComponent implements OnInit {
  configsInfo = {
    logo: '',
    address: '',
    email: '',
    phone: '',
    zalo: '',
  };

  constructor(
    private configSvc: ConfigService,
    public dialog: MatDialog,
    private commonHelper: CommonHelper,
  ) {}

  ngOnInit(): void {
    this.configSvc.configInfo$.subscribe((res: any) => {
      if (res.length) {
        res.forEach((e: any) => {
          switch (e.code) {
            case CONFIGS.LOGO:
              this.configsInfo.logo = e.value;
              break;
            case CONFIGS.ADDRESS:
              this.configsInfo.address = e.value;
              break;
            case CONFIGS.EMAIL:
              this.configsInfo.email = e.value;
              break;
            case CONFIGS.HOTLINE:
              this.configsInfo.phone = e.value;
              break;
            case CONFIGS.ZALO:
              this.configsInfo.zalo = e.value;
              break;

            default:
              break;
          }
        });
      }
    });
  }

  onCreateMovie() {
    const dialogDeleteSingle = this.dialog.open(DialogCreateMovieComponent);
    dialogDeleteSingle
      .afterClosed()
      .subscribe((res: { currentPassword: string; password: string; confirmPassword: string }) => {
        if (res?.password) {
          this.commonHelper.blockUI();
          // let user: any = JSON.parse(localStorage.getItem(CURRENT_USER) || '');
          // let body = {
          //   userId: user.id,
          //   currentPassword: encodePwd(res.currentPassword),
          //   newPassword: encodePwd(res.password),
          // };
        }
      });
  }
}

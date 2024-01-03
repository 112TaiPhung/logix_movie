import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { PERMISSIONS } from '../../@common/core.constants';
import { LocalStorageService } from '../../@services/local-storage.service';
import * as _ from 'lodash';
import { PERMISSION_CODE } from 'src/app/@common/app.permission.constants';

@Directive({
  selector: '[hasPermission]',
})
export class HasPermissionDirective implements OnInit {
  private permissions = [];
  private logicalOp = 'OR';
  private isHidden = true;
  private currPermissions = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: LocalStorageService,
  ) {}

  ngOnInit() {
    this.userService.getItem(PERMISSIONS).subscribe((data: any) => {
      this.currPermissions = data;
      this.updateView();
    });
  }

  @Input()
  set hasPermission(val: any) {
    this.permissions = val;
    this.updateView();
  }

  @Input()
  set hasPermissionOp(permop: any) {
    this.logicalOp = permop;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    if (_.includes(this.currPermissions, PERMISSION_CODE.SYSTEM.FULL_CONTROL)) {
      return true;
    }

    let hasPermission = false;

    if (this.currPermissions) {
      for (const checkPermission of this.permissions) {
        const permissionFound = this.currPermissions.find(
          (x: any) => x.toUpperCase() === (checkPermission as string).toUpperCase(),
        );
        if (permissionFound) {
          hasPermission = true;

          if (this.logicalOp === 'OR') {
            break;
          }
        } else {
          hasPermission = false;
          if (this.logicalOp === 'AND') {
            break;
          }
        }
      }
    }

    return hasPermission;
  }
}

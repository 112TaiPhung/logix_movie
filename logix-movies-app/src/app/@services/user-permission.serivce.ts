import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PERMISSIONS } from '../@common/core.constants';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class UserPermissionService {
  private currPermissions = [];
  constructor(private localstorageService: LocalStorageService) {
    this.localstorageService.getItem(PERMISSIONS).subscribe((data: any) => {
      if (data) {
        this.currPermissions = data;
      }
    });
  }

  hasPermission(val: any) {
    let hasPermission = false;

    if (val) {
      for (const checkPermission of val) {
        const permissionFound = this.currPermissions.find(
          (x: any) => x.toUpperCase() === checkPermission.toUpperCase(),
        );

        if (permissionFound) {
          hasPermission = true;
        } else {
          hasPermission = false;
        }
      }
    }

    return hasPermission;
  }
}

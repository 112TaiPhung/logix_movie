import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot) {
    const roles = this.authService.getPermissions();
    if (roles === null || roles.length === 0) {
      this.authService.removeStorage();
      this.router.navigate(['/authentication/login']);
      return false;
    }

    if (this.checkPermission(route, roles)) {
      return true;
    } else {
      this.router.navigate(['/403']);
      return false;
    }
  }

  private checkPermission(route: any, roles: any) {
    let checkPermission = false;
    const permissionRoute = route.data.permission;

    if (permissionRoute && roles.includes(permissionRoute)) {
      checkPermission = true;
    }

    return checkPermission;
  }
}

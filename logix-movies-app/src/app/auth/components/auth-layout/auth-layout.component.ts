import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  @Input() orgSelectNextLink: any;
  @Input() isHideOrgInfo: boolean = false;
  @Input() title = '';
  @Input() isDisplayLoadingBar = false;
  @Input() isOrgChangeDisabled = false;

  @Input() orgCode = '';

  loadingSettings: any = {
    color: '',
    includeSpinner: true,
    includeBar: true,
    height: '2px',
    diameter: '14px',
    fixed: true,
  };

  constructor() {}

  ngOnInit() {}
}

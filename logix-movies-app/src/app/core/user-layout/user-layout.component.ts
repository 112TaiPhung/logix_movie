import { Component, OnInit } from '@angular/core';
import { CONFIGS } from 'src/app/@common/core.constants';
import { ConfigService } from 'src/app/views/user/homepage/services/prduct.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit {
  constructor(private configSvc: ConfigService) {}

  ngOnInit(): void {}
}

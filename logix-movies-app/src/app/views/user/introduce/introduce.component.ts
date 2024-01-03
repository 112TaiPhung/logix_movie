import { Component, OnInit } from '@angular/core';
import { CONFIGS } from 'src/app/@common/core.constants';
import { UtilService } from 'src/app/services/util.service';
import { CommonHelper } from 'src/app/utils/common.helper';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../homepage/services/prduct.service';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss'],
})
export class IntroduceComponent implements OnInit {
  data = '';

  constructor(
    private commonHelper: CommonHelper,
    private configSvc: ConfigService,
    private utilSvc: UtilService,
  ) {}

  ngOnInit(): void {}
}

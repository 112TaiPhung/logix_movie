import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-action',
  templateUrl: './email-action.component.html',
  styleUrls: ['./email-action.component.scss'],
})
export class EmailActionComponent implements OnInit {
  action = null;
  constructor(private activatedActivated: ActivatedRoute) {}

  ngOnInit(): void {
    this.action = this.activatedActivated.snapshot.queryParams['mode'];
  }
}

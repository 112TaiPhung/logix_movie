import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { API_SERVICES } from '../api.define';
import { handleError } from '../utils/functions';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private httpClient: HttpClient) {}
}

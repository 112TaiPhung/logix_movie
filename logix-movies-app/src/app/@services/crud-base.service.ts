import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_SERVICES, API_VERSION_1, BASE_API_URL } from '../api.define';
import { generateBodyPostListview } from '../utils/functions';

@Injectable({
  providedIn: 'root',
})
export class CrudBaseService {
  apiName = '';

  constructor(public httpClient: HttpClient) {}

  getPaging(paging?: any, groupFilters?: any, sort?: any, includes?: string[]) {
    let body = generateBodyPostListview(paging, groupFilters, sort, includes);
    return this.httpClient.post(
      `${BASE_API_URL}/${API_VERSION_1}/${this.apiName}/${API_SERVICES.PAGING}`,
      body,
    );
  }

  create(body: any) {
    return this.httpClient.post(`${BASE_API_URL}/${API_VERSION_1}/${this.apiName}`, body);
  }

  getDetail(id: string) {
    return this.httpClient.get(`${BASE_API_URL}/${API_VERSION_1}/${this.apiName}/${id}`);
  }

  viewDetail(id: string) {
    return this.httpClient.get(
      `${BASE_API_URL}/${API_VERSION_1}/${this.apiName}/${id}/${API_SERVICES.VIEW_DETAIL}`,
    );
  }

  update(body: any) {
    return this.httpClient.put(`${BASE_API_URL}/${API_VERSION_1}/${this.apiName}`, body);
  }

  delete(id: string) {
    return this.httpClient.delete(`${BASE_API_URL}/${API_VERSION_1}/${this.apiName}/${id}`);
  }

  changeStatus(id: string, isActive: boolean) {
    return this.httpClient.put(
      `${BASE_API_URL}/${API_VERSION_1}/${this.apiName}/${id}/${API_SERVICES.CHANGE_STATUS}?isActive=${isActive}`,
      null,
    );
  }
}

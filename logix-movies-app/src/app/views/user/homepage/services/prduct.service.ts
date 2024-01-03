import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_SERVICES, APP_CODE_UPLOAD } from 'src/app/api.define';
import { generateBodyPostListview } from 'src/app/utils/functions';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configInfo$ = new BehaviorSubject('');

  constructor(public httpClient: HttpClient) {}

  getViewPaging(paging?: any, groupFilters?: any, sort?: any, includes?: string[]) {
    let body = generateBodyPostListview(paging, groupFilters, sort, includes);
    return this.httpClient.post(`${API_SERVICES.MOVIE.PAGING}`, body);
  }

  createMovie(name: string, fileAvatar: File, fileMovie: File) {
    const formData: FormData = new FormData();
    formData.append('FileAvatar', fileAvatar);
    formData.append('FileMovie', fileMovie);
    formData.append('Name', name);
    return this.httpClient.post(`${API_SERVICES.MOVIE.POST}`, formData);
  }

  likeMovie(id: string, like: boolean) {
    let url = `${API_SERVICES.MOVIE.LIKEMOVIE}?isFavorite=${like}`.replace(':id', id);
    return this.httpClient.post(url, null);
  }
}

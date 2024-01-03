import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ICache {
  [key: string]: BehaviorSubject<any>;
}
type Serializable = object | Object;

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private cache: ICache;

  constructor() {
    this.cache = Object.create(null);
  }

  /**
   * @description fix bug mất permission trong lần đăng nhập đầu tiên
   */
  public resetCache() {
    this.cache = {};
  }

  setItem<T extends Serializable>(key: string, value: T): BehaviorSubject<T> {
    localStorage.setItem(key, JSON.stringify(value));

    if (this.cache[key]) {
      this.cache[key].next(value);
      return this.cache[key];
    }

    return (this.cache[key] = new BehaviorSubject(value));
  }

  getItem<T extends Serializable>(key: string): BehaviorSubject<T> {
    if (this.cache[key]) return this.cache[key];
    else
      return (this.cache[key] = new BehaviorSubject(JSON.parse(localStorage.getItem(key) || '[]')));
  }

  setItemFilter<T extends Serializable>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItemFilter(key: string) {
    return JSON.parse(localStorage.getItem(key) || '');
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    if (this.cache[key]) this.cache[key].next(undefined);
  }
}

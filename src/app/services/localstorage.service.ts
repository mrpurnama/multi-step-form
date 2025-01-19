import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
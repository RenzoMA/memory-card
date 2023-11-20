import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isFooterVisible = signal(true);
  constructor() { }

  showFooter() {
    this.isFooterVisible.set(true);
  }

  hideFooter() {
    this.isFooterVisible.set(false);
  }
}

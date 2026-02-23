import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PriceStreamService {

  private subject = new Subject<number>();
  private timer: any;

  start() {
    if (this.timer) return;

    this.timer = setInterval(() => {
      const price = +(100 + Math.random() * 100).toFixed(2);
      this.subject.next(price);
    }, 2000);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  get stream$(): Observable<number> {
    return this.subject.asObservable();
  }
}
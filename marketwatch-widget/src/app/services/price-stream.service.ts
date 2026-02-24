import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PriceStreamService {
  private subject = new Subject<number>();
  private timer: any;

  constructor(private zone: NgZone) { }

  start() {
    if (this.timer) { return; }
    const emit = () => this.subject.next(Math.round((100 + Math.random() * 100) * 100) / 100);
    emit();
    this.zone.runOutsideAngular(() => this.timer = setInterval(emit, 2000));
  }

  stop() { clearInterval(this.timer); this.timer = null; }

  get stream() { return this.subject.asObservable(); }
}
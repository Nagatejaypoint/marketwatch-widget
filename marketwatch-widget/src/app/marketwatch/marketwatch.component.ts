import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PriceStreamService } from '../services/price-stream.service';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-marketwatch', standalone: true, imports: [CommonModule, FormsModule],
  templateUrl: './marketwatch.component.html', styleUrls: ['./marketwatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketwatchComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chart') chartRef!: ElementRef;
  chart?: Chart;
  prices: number[] = [];
  labels: string[] = [];
  latest = 0; prev = 0; threshold = 150;
  trend: 'up' | 'down' | null = null;
  paused = false;
  sub?: Subscription;

  constructor(private service: PriceStreamService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.sub = this.service.stream.subscribe(p => this.update(p));
    this.service.start();
  }

  update(p: number) {
    this.prev = this.latest; this.latest = p;
    if (this.prev) { this.trend = p > this.prev ? 'up' : 'down'; }
    this.prices.push(p); this.labels.push('');
    if (this.prices.length > 30) { this.prices.shift(); this.labels.shift(); }
    this.chart?.update('none');
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: { labels: this.labels, datasets: [{ label: 'Price', data: this.prices, borderColor: '#2563eb', backgroundColor: 'rgba(37, 99, 235, 0.1)', fill: true, tension: 0.4, pointRadius: 3 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { grid: { color: '#f0f0f0' } } } }
    });
  }

  onThresholdChange(v: string | number) {
    this.threshold = typeof v === 'string' ? parseFloat(v) : v;
    this.cdr.detectChanges();
  }

  toggle() {
    this.paused = !this.paused;
    this.paused ? this.service.stop() : this.service.start();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.service.stop();
    this.chart?.destroy();
  }
}
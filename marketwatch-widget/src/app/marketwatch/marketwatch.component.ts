import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PriceStreamService } from '../services/price-stream.service';
import { Subscription } from 'rxjs';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-marketwatch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marketwatch.component.html',
  styleUrls: ['./marketwatch.component.scss']
})
export class MarketwatchComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('chart') chartRef!: ElementRef;
  chart!: Chart;

  prices: number[] = [];

  latest = 0;
  prev = 0;
  trend: 'up' | 'down' | null = null;

  threshold = 150;
  paused = false;

  sub?: Subscription;

  constructor(private service: PriceStreamService) { }

  ngOnInit() {
    this.service.start();

    this.sub = this.service.stream$.subscribe(p => {
      this.prev = this.latest;
      this.latest = p;
      this.trend = this.latest > this.prev ? 'up' : 'down';

      this.prices.push(p);
      if (this.prices.length > 30) this.prices.shift();

      this.updateChart();
    });
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{ data: [], label: 'Price' }]
      }
    });
  }

  updateChart() {
    if (!this.chart) return;
    this.chart.data.labels = this.prices.map(() => '');
    this.chart.data.datasets[0].data = this.prices;
    this.chart.update();
  }

  toggle() {
    this.paused = !this.paused;
    this.paused ? this.service.stop() : this.service.start();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.service.stop();
  }
}
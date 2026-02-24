# MarketWatch Widget

A high-performance, real-time price monitoring widget built with Angular 18 and Chart.js.

## ✨ Features
- **Real-time Price Stream**: Simulated WebSocket data feed with live updates.
- **Dynamic Visualization**: Responsive line chart with optimized rendering.
- **Smart Alerts**: Visual warnings when prices exceed user-defined thresholds.
- **Power Controls**: Pause/Resume functionality to manage data intake.
- **Trend Indicators**: Live "Up/Down" markers based on price movements.

## 🚀 Technical Optimizations
This project was built with a strong focus on **performance** and **best practices**:

### ⚡ Runtime Efficiency
- **Zoneless Readiness**: The price generation interval runs outside Angular's zone (`runOutsideAngular`) to prevent unnecessary global change detection cycles.
- **Granular Chart.js**: Only required Chart.js modules are registered and imported, significantly reducing the final bundle size through tree-shaking.
- **OnPush Strategy**: Uses `ChangeDetectionStrategy.OnPush` and manual `ChangeDetectorRef` triggers to ensure the UI only re-renders when data actually changes.

### 📁 Memory & Resource Management
- **Subscription Lifecycle**: Automatic cleanup of RxJS subscriptions and Chart instances during `OnDestroy` to prevent memory leaks.
- **Efficient Updates**: Uses `chart.update('none')` to bypass expensive layout animations during data ingestion.
- **Numerical Precision**: Uses bitwise-equivalent Math operations instead of string-based `.toFixed()` for high-frequency calculations.

### 🛠️ Architecture
- **Dependency Injection**: Uses constructor-based injection for clean, testable, and standard-compliant service management.
- **State Management**: Local component state is strictly typed and managed using standard Angular lifecycle hooks (`ngOnInit`, `ngAfterViewInit`, `ngOnDestroy`).

## 🛠️ Quick Start
1. **Install**: `npm install`
2. **Start**: `npm start`
3. **View**: Open `http://localhost:4200/`

---

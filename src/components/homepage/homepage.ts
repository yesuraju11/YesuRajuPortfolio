import { afterNextRender, Component, computed, DestroyRef, inject, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-homepage',
  styleUrl: './homepage.css',
  templateUrl: './homepage.html',
})
export class Homepage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentTime = signal(Date.now());
  readonly experienceYears = computed(() => {
    const joinedAt = Date.UTC(2024, 11, 2);
    const yearInMilliseconds = 365.2425 * 24 * 60 * 60 * 1000;
    return Math.max(0, (this.currentTime() - joinedAt) / yearInMilliseconds).toFixed(1);
  });

  constructor() {
    afterNextRender(() => {
      const intervalId = window.setInterval(() => this.currentTime.set(Date.now()), 60_000);
      this.destroyRef.onDestroy(() => window.clearInterval(intervalId));
    });
  }
}

import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private overlay: Overlay) {}

  public isLoading$(): BehaviorSubject<boolean> {
    return this._loading$;
  }

  public getLoading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  public setLoading(_value: boolean): void {
    this._loading$.next(_value);
  }

  public createOverlay(config: OverlayConfig): OverlayRef {
    return this.overlay.create(config);
  }

  public attachTemplatePortal(
    overlayRef: OverlayRef,
    templateRef: TemplateRef<unknown>,
    vcRef: ViewContainerRef
  ) {
    const templatePortal = new TemplatePortal(templateRef, vcRef);
    overlayRef.attach(templatePortal);
  }

  public positionGloballyCenter(): PositionStrategy {
    return this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
  }
}

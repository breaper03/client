import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Observable } from 'rxjs';
import { OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'i-andes-app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  public loading$: Observable<boolean>;

  @ViewChild('progressSpinnerRef')
  private progressSpinnerRef!: TemplateRef<unknown>;
  private progressSpinnerOverlayConfig!: OverlayConfig;
  private overlayRef!: OverlayRef;
  constructor(private loader: LoaderService, private vcRef: ViewContainerRef) {
    this.loading$ = this.loader.getLoading$();
  }

  ngOnInit() {
    // Config for Overlay Service
    this.progressSpinnerOverlayConfig = {
      hasBackdrop: true,
      positionStrategy: this.loader.positionGloballyCenter(),
    };

    // Create Overlay for progress spinner
    this.overlayRef = this.loader.createOverlay(
      this.progressSpinnerOverlayConfig
    );

    this.loading$.subscribe((res) => {
      if (res && !this.overlayRef.hasAttached()) {
        this.loader.attachTemplatePortal(
          this.overlayRef,
          this.progressSpinnerRef,
          this.vcRef
        );
      } else if (!res && this.overlayRef.hasAttached()) {
        this.overlayRef.detach();
      }
    });
  }
}


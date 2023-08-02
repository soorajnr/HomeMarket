import { Injectable, Injector } from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { CAMERA_REF } from './camera-ref_token';
import { CameraComponent } from './camera.component';

@Injectable()
export class CameraService {

  private overlay!: OverlayRef

  constructor(
    private injector: Injector,
    private overlayService: Overlay,
    
  ) { }

  public open(): Promise<string> {
    if (!this.overlay) {
      this.overlay = this.createOverlay();
    }
    return new Promise<string>((resolve, reject) => {
      // create injector
      const injectionTokens = new WeakMap();
      injectionTokens.set(CAMERA_REF, {
        close: (returnValue: string | PromiseLike<string>) => {
          this.overlay.detach();
          resolve(returnValue);
        },
        reject: (reason: any) => {
          this.overlay.detach();
          reject(reason);
        }
      });
      const injector = new PortalInjector(this.injector, injectionTokens);
      // create portal
      const portal = new ComponentPortal(CameraComponent, null, injector);
      // attach portal to overlay
      this.overlay.attach(portal);
    });
  }

  private createOverlay(): OverlayRef {
    const config = new OverlayConfig();
    config.positionStrategy = this.overlayService.position()
      .global();
    config.panelClass = 'full-panel';
    return this.overlayService.create(config);
  }

}

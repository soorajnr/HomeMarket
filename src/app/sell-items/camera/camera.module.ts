import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { CameraComponent } from './camera.component';
import { CameraService } from './camera.service';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    CameraComponent
  ],
  providers: [
    CameraService
  ],
  entryComponents: [
    CameraComponent
  ]
})
export class CameraModule { }

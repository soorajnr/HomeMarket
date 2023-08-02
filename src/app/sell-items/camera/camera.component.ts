import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CAMERA_REF } from './camera-ref_token';
import { CameraRef } from './camera-ref';
import { MatSliderChange } from '@angular/material/slider';

export enum Rotation {
  TOP,
  LEFT,
  BOTTOM,
  RIGHT
}

@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, OnDestroy {

  @ViewChild('canvas')
  public canvas: ElementRef | any;

  public canTorch: boolean | undefined;

  public torchOn: boolean | undefined;

  public canZoom: boolean | undefined;

  public zoomMax: number | undefined;

  public zoomMin: number | undefined;

  public zoomStep: number | undefined;

  public zoomValue: number = 50;

  public canSwapCamera: boolean | undefined;

  public pictureData: string | any;

  private video: HTMLVideoElement | any;

  private stream: MediaStream | any;

  private videoDevices: any[] | undefined;

  private videoDeviceId: string | undefined;

  private nextVideoDevice: number = 0;

  private animationFrameId: number | undefined;

  private rotation: number = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(CAMERA_REF) private cameraRef: CameraRef
  ) {
    this.video = this.createInMemoryVideoElement(this.document);
    this.loadSettings();
  }

  public ngOnInit(): void {
    this.loadSettings();
    if (this.videoDeviceId && !this.isSafari()) {
      this.setupStream(this.videoDeviceId);
    } else {
      this.setupStream();
    }
  }

  public ngOnDestroy(): void {
    this.saveSettings();
    this.cleanUp();
  }

  public toggleTorch(): void {
    if (this.torchOn) {
      this.stream.getVideoTracks()[0].applyConstraints({ advanced: [{ torch: false }] });
      this.torchOn = false;
    } else {
      this.stream.getVideoTracks()[0].applyConstraints({ advanced: [{ torch: true }] });
      this.torchOn = true;
    }
  }

  public async swapCamera(): Promise<void> {
    if (navigator.mediaDevices && typeof navigator.mediaDevices.enumerateDevices === 'function' && !this.isSafari()) {
      if (!this.videoDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        this.videoDevices = devices.filter(device => device.kind == 'videoinput');
      }
      const index = this.nextVideoDevice % this.videoDevices.length;
      this.videoDeviceId = this.videoDevices[index].deviceId;
      this.cleanUp();
      this.setupStream(this.videoDeviceId);
      this.nextVideoDevice++;
    }
  }

  public rotate() {
    // https://stackoverflow.com/a/38034825/6656422
    const numberOfPossibleRotationPositions = Object.keys(Rotation).length / 2;
    this.rotation = (this.rotation + 1) % numberOfPossibleRotationPositions;
  }

  public onZoomChange(): void {
    this.stream.getVideoTracks()[0].applyConstraints({ advanced: [{ zoom: 20 }] });
  }

  public takePicture(): void {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.pictureData = canvas.toDataURL('image/jpeg');
  }

  public retake(): void {
    this.pictureData = null;
  }

  public use(): void {
    this.cameraRef.close(this.pictureData);
  }

  public close(): void {
    this.cameraRef.close();
  }

  private async setupStream(deviceId?: string): Promise<void> {
    let constraints: MediaStreamConstraints;
    if (deviceId) {
      constraints = { video: { deviceId } };
    } else {
      constraints = { video: { facingMode: 'environment' } };
    }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      if (deviceId) {
        // if failed with device id try again without
        this.setupStream();
      } else {
        this.cameraRef.reject(error);
      }
    }
    if (this.stream) {
      // start video
      this.addStreamToVideo(this.stream, this.video);
      this.stopCanvas();
      const canvas: HTMLCanvasElement = this.canvas.nativeElement;
      this.startCanvas(canvas, this.video);
      this.setupControls(this.stream.getVideoTracks()[0])
    }
  }

  private updateCanvas(canvas: HTMLCanvasElement, video: HTMLVideoElement): void {
    const context: CanvasRenderingContext2D | any = canvas.getContext('2d');
    
    switch (this.rotation) {
      case Rotation.TOP:
      default:
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        break;
      case Rotation.LEFT:
        canvas.width = video.videoHeight;
        canvas.height = video.videoWidth;
        context.transform(0, -1, 1, 0, 0, video.videoWidth);
        break;
      case Rotation.BOTTOM:
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.transform(-1, 0, 0, -1, video.videoWidth, video.videoHeight);
        break;
      case Rotation.RIGHT:
        canvas.width = video.videoHeight;
        canvas.height = video.videoWidth;
        context.transform(0, 1, -1, 0, video.videoHeight, 0);
        break;
    }
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  }

  private startCanvas(canvas: HTMLCanvasElement, video: HTMLVideoElement): void {
    const frame = () => {
      this.updateCanvas(canvas, video);
      this.animationFrameId = requestAnimationFrame(frame);
    }
    this.animationFrameId = requestAnimationFrame(frame);
  }

  private stopCanvas(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private addStreamToVideo(stream: MediaStream, video: HTMLVideoElement): void {
    // Older browsers may not have srcObject
    if ('srcObject' in video) {
      video.srcObject = stream;
    } else {
      this.video.src = URL.createObjectURL(this.stream);
    }
    video.load();
  }

  private setupControls(track: MediaStreamTrack): void {
    if (track && typeof track.getCapabilities === 'function') {
      // capabilities not imediatly avalible and no events fire reliably after avalible
      setTimeout(() => {
        const capabilities = track.getCapabilities();
        this.canTorch = (capabilities as any).torch;
        this.canZoom = (capabilities as any).zoom;
        if (this.canZoom) {
          this.zoomMax = (capabilities as any).zoom.max;
          this.zoomMin = (capabilities as any).zoom.min;
          this.zoomStep = (capabilities as any).zoom.step;
        }
        const settings = track.getSettings();
        this.torchOn = (settings as any).torch;
        this.zoomValue = (settings as any).zoom;
      }, 1000);
    }
    if (navigator.mediaDevices && typeof navigator.mediaDevices.enumerateDevices === 'function' && !this.isSafari()) {
      this.canSwapCamera = true;
    }
  }

  private stopStream(stream: MediaStream) {
    if (typeof this.stream.stop == 'function') {
      this.stream.stop();
    }
    stream.getTracks().forEach(track => {
      track.stop();
    })
  }

  private cleanUp(): void {
    this.stopCanvas();
    // revoke if fallback to createObjectURL was used
    if (this.video.src) {
      URL.revokeObjectURL(this.video.src);
    }
    if (this.stream) {
      this.stopStream(this.stream);
    }
  }

  private createInMemoryVideoElement(document: Document): HTMLVideoElement {
    const video: HTMLVideoElement = document.createElement('video');
    video.setAttributeNode(document.createAttribute('playsinline'));
    video.autoplay = true;
    return video;
  }

  private saveSettings(): void {
    if (this.rotation != null) {
      localStorage.setItem('camera-rotation', JSON.stringify(this.rotation));
    }
    if (this.videoDeviceId != null && !this.isSafari()) {
      localStorage.setItem('camera-device-id', JSON.stringify(this.videoDeviceId));
    }
  }

  private loadSettings(): void {
    const rotationJSON = localStorage.getItem('camera-rotation');
    const rotationJSON2 = localStorage.getItem('camera-device-id');
    const rotation = rotationJSON ? JSON.parse(rotationJSON) : null;
    const videoDeviceId = rotationJSON2 ? JSON.parse(rotationJSON2) : null;
    if (rotation != null) {
      this.rotation = rotation;
    }
    if (videoDeviceId != null && !this.isSafari()) {
      this.videoDeviceId = videoDeviceId;
    }
  }

  private isSafari(): boolean {
    return new RegExp('^((?!chrome|android).)*safari', 'i').test(navigator.userAgent);
  }

}

import { InjectionToken } from '@angular/core';
// import * as Webstomp from 'webstomp-client';

export const WEBSOCKET = new InjectionToken<WebSocket>('WebSocket');
export const WEBSTOMP = new InjectionToken<any>('Webstomp');

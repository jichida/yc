import { createAction } from 'redux-act';

export const sendsmartdevicecmd_request = createAction('sendsmartdevicecmd_request');
export const sendsmartdevicecmd_result = createAction('sendsmartdevicecmd_result');

export const subscribedevice_request = createAction('subscribedevice_request');
export const subscribedevice_result = createAction('subscribedevice_result');

export const serverpush_devicerealtimedata = createAction('serverpush_devicerealtimedata');

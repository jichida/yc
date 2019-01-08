import { fork } from 'redux-saga/effects';
import {wsflow} from './api.ws.js';
import {createsagacallbackflow} from './pagination';

import {wsrecvsagaflow} from './wsrecvsaga';
import {wsrecvsagabizflow} from './wsrecvsaga_biz';
import {wsrecvsagasmartdeviceflow} from './wsrecvsaga_smartdevice';
import {socketflow} from './socketflow';
import {uiflow} from './ui';
// import config from '../env/config.js';

export default function* rootSaga() {
  try{
    // if(config.softmode === 'app'){
    //   yield fork(jpushflow);
    // }
    yield fork(createsagacallbackflow);

    yield fork(wsflow);
    yield fork(socketflow);

    yield fork(uiflow);
    yield fork(wsrecvsagaflow);
    yield fork(wsrecvsagabizflow);
    yield fork(wsrecvsagasmartdeviceflow);

  }
  catch(e){
    console.log(e);
  }

}

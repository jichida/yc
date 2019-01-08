import { put,takeLatest} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
import {
  set_weui,
  sendsmartdevicecmd_result,
  serverpush_devicerealtimedata,
  set_db,
} from '../actions';
// import { goBack  } from 'react-router-redux';
// import lodashget from 'lodash.get';

export function* wsrecvsagasmartdeviceflow() {

  yield takeLatest(`${sendsmartdevicecmd_result}`,function*(action){
    const {payload} = action;
    const {deviceid,turnovermode,turnovertime} = payload;
    const echotext = `服务器接收到发送到设备${deviceid}的命令${turnovermode},持续时间:${turnovertime}`;
    yield put(set_weui({
      toast:{
        text:echotext,
        show: true,
        type:'success'
    }}));
  });

  yield takeLatest(`${serverpush_devicerealtimedata}`,function*(action){
    const {payload} = action;
    let smartdevices = {};
    smartdevices[payload._id] = payload;
    yield put(set_db({smartdevices}));
  });

}

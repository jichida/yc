import {takeLatest,call} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
//
//
// import { push,replace } from 'react-router-redux';
// import moment from 'moment';
// import config from '../env/config.js';
import {  notification } from 'antd';

import {set_weui} from '../actions';
// import Toast from 'antd-mobile/lib/toast';  // 加载 JS
// import 'antd-mobile/lib/toast/style/css';        // 加载 CSS
notification.config({
  placement: 'bottomRight',
  bottom: 10,
  duration: 3,
});

const popdialog = ({text,type})=>{
  return new Promise(resolve => {
      notification[type]({
        message: type === 'success'?'提示':'错误',
        description: text,
      });

      // if(type === 'success'){
      //   Toast.success(text, 1);
      // }
      // if(type === 'warning'){
      //   Toast.fail(text, 1);
      // }
      resolve();
    });
}
export function* uiflow(){//仅执行一次
  yield takeLatest(`${set_weui}`, function*(action) {
    const {toast} = action.payload;
    if(!!toast){
      yield call(popdialog,toast);
    }
  });
}

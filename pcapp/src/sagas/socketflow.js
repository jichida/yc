import {takeLatest,put,select} from 'redux-saga/effects';
import {
  notify_socket_connected,
  getsystemconfig_request,
  loginwithtoken_request,

} from '../actions';
import config from '../env/config';

//获取地理位置信息，封装为promise
export function* socketflow(){//仅执行一次
   yield takeLatest(`${notify_socket_connected}`, function*(action) {
      let {payload:issocketconnected} = action;
      console.log(`notify_socket_connected--->issocketconnected--->${issocketconnected}`);
      if(issocketconnected){
        yield put(getsystemconfig_request({}));

        //已经登录状态
        const loginsuccess = yield select((state)=>{
          return state.userlogin.loginsuccess;
        });

        if(loginsuccess){
          const token = localStorage.getItem(`yc_${config.softmode}_token`);
          if (!!token) {
            yield put(loginwithtoken_request({token}));
            console.log(`重新发送登录请求`);
          }
        }
      }
    });
}

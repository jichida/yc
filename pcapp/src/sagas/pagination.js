import { createAction } from 'redux-act';
import { take,put, call,race,takeLatest } from 'redux-saga/effects';
import {delay} from 'redux-saga';

const synccallreq = createAction('synccallreq');
export const page_getpatientinfolist_request = createAction('page_getpatientinfolist_request');
export const page_getpatientinfolist_result = createAction('page_getpatientinfolist_result');
export const page_getformreviewlapsetolist_request  = createAction('page_getformreviewlapsetolist_request');
export const page_getformreviewlapsetolist_result  = createAction('page_getformreviewlapsetolist_result');
export const page_getturnoverrecordlist_request  = createAction('page_getturnoverrecordlist_request');
export const page_getturnoverrecordlist_result  = createAction('page_getturnoverrecordlist_result');



//以下导出放在视图
export function callthen(actionreq,actionres,payload){
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(synccallreq({actionreq,actionres,resolve,reject,...payload}));
    });
  }
}
//以下导出放在saga中//以下导出放在saga中
export function* createsagacallbackflow(){
  yield takeLatest(`${synccallreq}`,function*(action){
    const {payload:{actionreq,actionres,resolve,reject,...data}} = action;
    try{
      yield put(actionreq(data));//发送请求
      const { response, timeout } = yield race({
         response: take(actionres),
         timeout: call(delay, 30000)
      });
      if(!!timeout){
        reject('请求超时!');
      }
      else{
        let {payload} = response;
        if (!!payload.err) {
          reject(payload);
        }
        else{
          resolve(payload);
        }
      }
    }
    catch(e){
      console.log(e);
      reject(e);
    }
  });
}

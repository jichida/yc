import { put,takeLatest,select} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
import {
  setpatientinfo_request,

  createevaluatebarden_result,
  editevaluatebarden_result,
  createevaluatenursingmeasures_result,
  editevaluatenursingmeasures_result,
  createevaluatewoundsurface_result,
  editevaluatewoundsurface_result,
  createformreviewlapseto_result,
  editformreviewlapseto_result,

  set_weui,
  set_db,

  // editpatientinfo_result,
  setpatientinfo_result,
  getpatientinfo_result,

  getevaluatebardenlist_result,
  getevaluatenursingmeasureslist_result,
  getevaluatewoundsurfacelist_result,

  getdepatlist_result
} from '../actions';
import { goBack  } from 'react-router-redux';
// import lodashmap from 'lodash.map';
import {
  normalizr_paientinfo,
  normalizr_evaluatebarden,
  normalizr_evaluatewoundsurface,
  normalizr_evaluatenursingmeasures,
  normalizr_formreviewlapseto,
  normalizr_turnoverrecord
} from './normalizr';
import {
  page_getpatientinfolist_result,
  page_getformreviewlapsetolist_result,
  page_getturnoverrecordlist_result
} from '../sagas/pagination';
// import config from '../env/config.js';
const popandreturn = [
  {
    req:`${createevaluatebarden_result}`,
    title:`新建Barden评估成功`
  },
  {
    req:`${editevaluatebarden_result}`,
    title:`编辑Barden评估成功`
  },
  {
    req:`${createevaluatenursingmeasures_result}`,
    title:`新建护理措施成功`
  },
  {
    req:`${editevaluatenursingmeasures_result}`,
    title:`编辑护理措施成功`
  },
  {
    req:`${createevaluatewoundsurface_result}`,
    title:`新建创面评估成功`
  },
  {
    req:`${editevaluatewoundsurface_result}`,
    title:`编辑创面评估成功`
  },
  {
    req:`${createformreviewlapseto_result}`,
    title:`新建转归表单成功`
  },
  {
    req:`${editformreviewlapseto_result}`,
    title:`编辑转归表单成功`
  }
]

export function* wsrecvsagabizflow() {

  for(let i = 0 ;i < popandreturn.length ; i++){
    yield takeLatest(popandreturn[i].req, function*(action) {
      const {payload} = action;

      yield put(set_weui({
        toast:{
          text:popandreturn[i].title,
          show: true,
          type:'success'
      }}));

      //<----
      if(i === 0 || i === 1){//createevaluatebarden_result/editevaluatebarden_result
        let evaluatebardens = {};
        evaluatebardens[payload._id] = payload;
        yield put(set_db({evaluatebardens}));
      }
      if(i === 2 || i === 3){//createevaluatenursingmeasures_result/editevaluatenursingmeasures_result
        let evaluatenursingmeasuress = {};
        evaluatenursingmeasuress[payload._id] = payload;
        yield put(set_db({evaluatenursingmeasuress}));
      }
      if(i === 4 || i === 5){//createevaluatewoundsurface_result/editevaluatewoundsurface_result
        let evaluatewoundsurfaces = {};
        evaluatewoundsurfaces[payload._id] = payload;
        yield put(set_db({evaluatewoundsurfaces}));
      }
      if(i === 6 || i === 7){//createformreviewlapseto_result/editformreviewlapseto_result
        let formreviewlapsetos = {};
        formreviewlapsetos[payload.data._id] = payload.data;
        yield put(set_db({formreviewlapsetos}));
      }

      if(i === 0 ||  i === 2 || i === 4 || i === 6){
        const userpatientid = i === 6?payload.data.userpatientid:payload.userpatientid;
        const paientinfo = yield select((state)=>{
          const {paientinfos} = state.db;
          return paientinfos[userpatientid];
        });
        if(!!paientinfo){
          if(i === 0 && !paientinfo.firstevaluatebardenid){
            yield put(setpatientinfo_request({
              _id:paientinfo._id,
              firstevaluatebardenid:payload._id
            }));
          }
          if(i === 2 && !paientinfo.firstevaluatenursingmeasuresid){
            yield put(setpatientinfo_request({
              _id:paientinfo._id,
              firstevaluatenursingmeasuresid:payload._id
            }));
          }
          if(i === 4 && !paientinfo.firstevaluatewoundsurfaceid){
            yield put(setpatientinfo_request({
              _id:paientinfo._id,
              firstevaluatewoundsurfaceid:payload._id
            }));
          }
          if(i === 6 ){
            if(!paientinfo.formreviewlapsetoid && !payload.isid2){
              yield put(setpatientinfo_request({
                _id:paientinfo._id,
                formreviewlapsetoid:payload.data._id
              }));
            }

            if(!paientinfo.formreviewlapsetoid2 && payload.isid2){
              yield put(setpatientinfo_request({
                _id:paientinfo._id,
                formreviewlapsetoid2:payload.data._id
              }));
            }
          }//<---------
        }
      }

      yield put(goBack());
    });
  }


  yield takeLatest(`${page_getpatientinfolist_result}`,function*(action){
    const {payload} = action;
    const result = normalizr_paientinfo(payload.result);
    yield put(set_db(result));
  });

  yield takeLatest(`${page_getformreviewlapsetolist_result}`,function*(action){
    const {payload} = action;
    const result = normalizr_formreviewlapseto(payload.result);
    yield put(set_db(result));
  });

  yield takeLatest(`${page_getturnoverrecordlist_result}`,function*(action){
    const {payload} = action;
    const result = normalizr_turnoverrecord(payload.result);
    yield put(set_db(result));
  });

  yield takeLatest(`${setpatientinfo_result}`,function*(action){
    const {payload} = action;
    let paientinfos = {};
    paientinfos[payload._id] = payload;
    yield put(set_db({paientinfos}));
  });

  // yield takeLatest(`${editpatientinfo_result}`,function*(action){
  //   const {payload} = action;
  //   let paientinfos = {};
  //   paientinfos[payload._id] = payload;
  //   yield put(set_db({paientinfos}));
  //   yield put(set_weui({
  //     toast:{
  //       text:'编辑病人成功',
  //       show: true,
  //       type:'success'
  //   }}));
  //   yield put(goBack());
  // });

  yield takeLatest(`${getpatientinfo_result}`,function*(action){
    const {payload} = action;
    let paientinfos = {};
    paientinfos[payload._id] = payload;
    yield put(set_db({paientinfos}));
  });

//-----------
  yield takeLatest(`${getevaluatebardenlist_result}`,function*(action){
    const {payload} = action;
    const result = normalizr_evaluatebarden(payload);
    yield put(set_db(result));
  });

  yield takeLatest(`${getevaluatenursingmeasureslist_result}`,function*(action){
    const {payload} = action;
    const result = normalizr_evaluatenursingmeasures(payload);
    yield put(set_db(result));
  });

  yield takeLatest(`${getevaluatewoundsurfacelist_result}`,function*(action){
    const {payload} = action;
    const result = normalizr_evaluatewoundsurface(payload);
    yield put(set_db(result));
  });
  //---------------getdepatlist_result
  yield takeLatest(`${getdepatlist_result}`,function*(action){
    const {payload} = action;
    const {list} = payload;
    let depats = {};
    for(let i = 0 ; i < list.length ; i++ ){
      const info = list[i];
      depats[info._id] = info;
    };
    yield put(set_db({depats}));
  });
}

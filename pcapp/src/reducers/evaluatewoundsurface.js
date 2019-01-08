import { createReducer } from 'redux-act';
import {
  createevaluatewoundsurface_result,
  getevaluatewoundsurfacelist_result,
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    evaluatewoundsurface: {
        evaluatewoundsurfacelist:[],
    },
};

const evaluatewoundsurface = createReducer({
  [createevaluatewoundsurface_result]:(state,payload)=>{
    return { ...state, evaluatewoundsurfacelist:[...state.evaluatewoundsurfacelist,payload._id] };
  },
  [getevaluatewoundsurfacelist_result]:(state,payload)=>{
      const {list} = payload;
      const evaluatewoundsurfacelist = [];
      lodashmap(list,(info)=>{
        evaluatewoundsurfacelist.push(info._id);
      });
      return {...state, evaluatewoundsurfacelist};
  },
}, initial.evaluatewoundsurface);

export default evaluatewoundsurface;

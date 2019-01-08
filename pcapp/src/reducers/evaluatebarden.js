import { createReducer } from 'redux-act';
import {
  createevaluatebarden_result,
  getevaluatebardenlist_result,
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    evaluatebarden: {
        evaluatebardenlist:[],
    },
};

const evaluatebarden = createReducer({
  [createevaluatebarden_result]:(state,payload)=>{
    return { ...state, evaluatebardenlist:[...state.evaluatebardenlist,payload._id] };
  },

  [getevaluatebardenlist_result]:(state,payload)=>{
      const {list} = payload;
      const evaluatebardenlist = [];
      lodashmap(list,(info)=>{
        evaluatebardenlist.push(info._id);
      });
      return {...state, evaluatebardenlist};
  },
}, initial.evaluatebarden);

export default evaluatebarden;

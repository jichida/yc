import { createReducer } from 'redux-act';
import {
  createevaluatenursingmeasures_result,
  getevaluatenursingmeasureslist_result,
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    evaluatenursingmeasures: {
        evaluatenursingmeasureslist:[],
    },
};

const evaluatenursingmeasures = createReducer({
  [createevaluatenursingmeasures_result]:(state,payload)=>{
    return { ...state, evaluatenursingmeasureslist:[...state.evaluatenursingmeasureslist,payload._id] };
  },
  [getevaluatenursingmeasureslist_result]:(state,payload)=>{
      const {list} = payload;
      const evaluatenursingmeasureslist = [];
      lodashmap(list,(info)=>{
        evaluatenursingmeasureslist.push(info._id);
      });
      return {...state, evaluatenursingmeasureslist};
  },
}, initial.evaluatenursingmeasures);

export default evaluatenursingmeasures;

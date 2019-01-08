import { createReducer } from 'redux-act';
import {
  set_db,
 } from '../actions';

const initial = {
    db: {
        paientinfos: {},
        users:{},
        beds:{},
        smartdevices:{},
        depats:{},
        evaluatebardens: {},
        evaluatewoundsurfaces: {},
        evaluatenursingmeasuress: {},
        formreviewlapsetos:{}
    },
};

const db = createReducer({
  [set_db]:(state,payload)=>{
      const {paientinfos,smartdevices,beds,depats,users,formreviewlapsetos,
        evaluatebardens,evaluatewoundsurfaces,evaluatenursingmeasuress}  = payload;

      let new_paientinfos = state.paientinfos;
      let new_smartdevices = state.smartdevices;
      let new_beds = state.beds;
      let new_depats = state.depats;
      let new_users = state.users;
      let new_evaluatebardens = state.evaluatebardens;
      let new_evaluatewoundsurfaces = state.evaluatewoundsurfaces;
      let new_evaluatenursingmeasuress = state.evaluatenursingmeasuress;
      let new_formreviewlapsetos = state.formreviewlapsetos;

      if(!!paientinfos){
        new_paientinfos = {...new_paientinfos,...paientinfos};
      }
      if(!!smartdevices){
        new_smartdevices = {...new_smartdevices,...smartdevices};
      }
      if(!!beds){
        new_beds = {...new_beds,...beds};
      }
      if(!!depats){
        new_depats = {...new_depats,...depats};
      }
      if(!!users){
        new_users = {...new_users,...users};
      }
      if(!!evaluatebardens){
        new_evaluatebardens = {...new_evaluatebardens,...evaluatebardens};
      }
      if(!!evaluatewoundsurfaces){
        new_evaluatewoundsurfaces = {...new_evaluatewoundsurfaces,...evaluatewoundsurfaces};
      }
      if(!!evaluatenursingmeasuress){
        new_evaluatenursingmeasuress = {...new_evaluatenursingmeasuress,...evaluatenursingmeasuress};
      }
      if(!!formreviewlapsetos){
        new_formreviewlapsetos = {...new_formreviewlapsetos,...formreviewlapsetos};
      }
      return {...state,
        paientinfos:new_paientinfos,smartdevices:new_smartdevices,beds:new_beds,depats:new_depats,
        users:new_users,evaluatebardens:new_evaluatebardens,evaluatewoundsurfaces:new_evaluatewoundsurfaces,
        evaluatenursingmeasuress:new_evaluatenursingmeasuress,formreviewlapsetos:new_formreviewlapsetos
      };
  },
}, initial.db);

export default db;

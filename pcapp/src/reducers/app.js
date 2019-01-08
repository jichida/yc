import { createReducer } from 'redux-act';
import {
    notify_socket_connected,
    getsystemconfig_result,
    set_uiapp,
} from '../actions';


const initial = {
    app: {
        SettingOfflineMinutes:1,
        tabindex:0,
        socketconnected:false,
        ispopuserinfo:false,
        ispoppwd:false,
        selectedindex:0,
        patientbkcolor:{
            '普通病人':'#009b87',
            '院前压疮':'#0088cc',
            '院内压疮':'#cc3300',
            '难免压疮':'#FF6600',
            '难免转院内':'#BB0088',
        }
    },
};

const app = createReducer({
    [set_uiapp]:(state,payload)=>{
      return {...state,...payload};
    },
    [getsystemconfig_result]:(state,payload)=>{
        return {...state,...payload};
    },
    [notify_socket_connected]:(state,socketconnected)=>{
        return {...state,socketconnected};
    },

}, initial.app);

export default app;

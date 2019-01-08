import { createReducer } from 'redux-act';
import {
  //登录
    login_result,
    logout_result,
    saveusersettings_result,
    getcount_reviewlapseto_result,
    getstat_result,
} from '../actions';
import config from '../env/config';

const initial = {
  userlogin:{
    loginsuccess: false,
    username: '',
    token: '',
    avatar : "",
    reviewnumber:0,
    stat:{
      count_total:0,
      count_occur1:0,
      count_occur2:0,
      count_cure:0
    },
    usersettings : {
    },
  },
};

const userlogin = createReducer({
  [getstat_result]:(state,payload)=>{
    const {count_total,count_occur1,count_occur2,count_cure} =  payload;
    const stat =  {count_total,count_occur1,count_occur2,count_cure};
    return { ...state, stat};
  },
  [getcount_reviewlapseto_result]:(state,payload)=>{
    const {number} =  payload;
    return { ...state, reviewnumber:number};
  },
  [saveusersettings_result]:(state,payload)=>{
    return { ...state, ...payload};
  },
  [logout_result]: (state, payload) => {
    localStorage.removeItem(`yc_${config.softmode}_token`);
    const username = state.username;
    let userlogin = {...initial.userlogin};
    userlogin.username = username;
    console.log(userlogin)
    return { ...userlogin};
  },
  [login_result]: (state, payload) => {
    // localStorage.setItem('zhongnan_driver_token',payload.token);
    return { ...state, ...payload};
  },
}, initial.userlogin);

export default userlogin;

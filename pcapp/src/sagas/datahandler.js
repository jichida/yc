import {
    common_err,

    loginwithtoken_request,
    login_request,
    md_login_result,//这个result特殊，需要判断是否登录

    logout_request,
    logout_result,

    getsystemconfig_request,
    getsystemconfig_result,


    changepwd_request,
    changepwd_result,

    saveusersettings_request,
    saveusersettings_result,

    getpatientinfo_request,
    getpatientinfo_result,

    getdepatlist_request,
    getdepatlist_result,

    createevaluatebarden_request,
    createevaluatebarden_result,

    editevaluatebarden_request,
    editevaluatebarden_result,

    getevaluatebardenlist_request,
    getevaluatebardenlist_result,

    createevaluatenursingmeasures_request,
    createevaluatenursingmeasures_result,

    editevaluatenursingmeasures_request,
    editevaluatenursingmeasures_result,

    getevaluatenursingmeasureslist_request,
    getevaluatenursingmeasureslist_result,

    createevaluatewoundsurface_request,
    createevaluatewoundsurface_result,

    editevaluatewoundsurface_request,
    editevaluatewoundsurface_result,

    createformreviewlapseto_request,
    createformreviewlapseto_result,

    editformreviewlapseto_request,
    editformreviewlapseto_result,



    getevaluatewoundsurfacelist_request,
    getevaluatewoundsurfacelist_result,

    editpatientinfo_request,
    editpatientinfo_result,

    setpatientinfo_request,
    setpatientinfo_result,

    sendsmartdevicecmd_request,
    sendsmartdevicecmd_result,

    subscribedevice_request,
    subscribedevice_result,
    serverpush_devicerealtimedata,

    getcount_reviewlapseto_request,
    getcount_reviewlapseto_result,

    getstat_request,
    getstat_result
  } from '../actions';

import {
  page_getpatientinfolist_request,
  page_getpatientinfolist_result,
  page_getformreviewlapsetolist_request,
  page_getformreviewlapsetolist_result,
  page_getturnoverrecordlist_request,
  page_getturnoverrecordlist_result
} from './pagination';
//接收的对应关系
let recvmessagetoresultpair = {
  'serverpush_devicerealtimedata':serverpush_devicerealtimedata,
  'subscribedevice_result':subscribedevice_result,
  'sendsmartdevicecmd_result':sendsmartdevicecmd_result,
  'page_getturnoverrecordlist_result':page_getturnoverrecordlist_result,
  'page_getformreviewlapsetolist_result':page_getformreviewlapsetolist_result,
  'createformreviewlapseto_result':createformreviewlapseto_result,
  'editformreviewlapseto_result':editformreviewlapseto_result,

  'createevaluatebarden_result':createevaluatebarden_result,
  'editevaluatebarden_result':editevaluatebarden_result,
  'getevaluatebardenlist_result':getevaluatebardenlist_result,

  'createevaluatenursingmeasures_result':createevaluatenursingmeasures_result,
  'editevaluatenursingmeasures_result':editevaluatenursingmeasures_result,
  'getevaluatenursingmeasureslist_result':getevaluatenursingmeasureslist_result,

  'createevaluatewoundsurface_result':createevaluatewoundsurface_result,
  'editevaluatewoundsurface_result':editevaluatewoundsurface_result,
  'getevaluatewoundsurfacelist_result':getevaluatewoundsurfacelist_result,

  'editpatientinfo_result':editpatientinfo_result,
  'setpatientinfo_result':setpatientinfo_result,
  'page_getpatientinfolist_result':page_getpatientinfolist_result,
  'getpatientinfo_result':getpatientinfo_result,
  'getdepatlist_result':getdepatlist_result,

  'saveusersettings_result':saveusersettings_result,

  'getcount_reviewlapseto_result':getcount_reviewlapseto_result,

  'getsystemconfig_result':getsystemconfig_result,
  'getstat_result':getstat_result,

  'common_err':common_err,

  'login_result':md_login_result,
  'logout_result':logout_result,

  'changepwd_result':changepwd_result
};

//非验证发送接口
let sendmessagefnsz = {

  'logout':`${logout_request}`,
  'loginwithtoken':`${loginwithtoken_request}`,
  'login':`${login_request}`,

  'getsystemconfig':`${getsystemconfig_request}`,


};

//验证发送接口
let sendmessageauthfnsz = {
  'getstat':`${getstat_request}`,
  'getcount_reviewlapseto':`${getcount_reviewlapseto_request}`,
  'sendsmartdevicecmd':`${sendsmartdevicecmd_request}`,
  'subscribedevice':`${subscribedevice_request}`,

  'saveusersettings':`${saveusersettings_request}`,
  'page_getpatientinfolist':`${page_getpatientinfolist_request}`,
  'setpatientinfo':`${setpatientinfo_request}`,
  'editpatientinfo':`${editpatientinfo_request}`,
  'createevaluatebarden':`${createevaluatebarden_request}`,
  'editevaluatebarden':`${editevaluatebarden_request}`,
  'getevaluatebardenlist':`${getevaluatebardenlist_request}`,

  'createevaluatenursingmeasures':`${createevaluatenursingmeasures_request}`,
  'editevaluatenursingmeasures':`${editevaluatenursingmeasures_request}`,
  'getevaluatenursingmeasureslist':`${getevaluatenursingmeasureslist_request}`,

  'createevaluatewoundsurface':`${createevaluatewoundsurface_request}`,
  'editevaluatewoundsurface':`${editevaluatewoundsurface_request}`,
  'getevaluatewoundsurfacelist':`${getevaluatewoundsurfacelist_request}`,

  'createformreviewlapseto':`${createformreviewlapseto_request}`,
  'editformreviewlapseto':`${editformreviewlapseto_request}`,
  'page_getformreviewlapsetolist':`${page_getformreviewlapsetolist_request}`,
  'page_getturnoverrecordlist':`${page_getturnoverrecordlist_request}`,
  'getpatientinfolist':`${getpatientinfo_request}`,
  'getdepatlist':`${getdepatlist_request}`,
  'changepwd':`${changepwd_request}`,
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};

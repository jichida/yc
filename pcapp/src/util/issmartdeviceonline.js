import moment from 'moment';
import lodashget from 'lodash.get';

const getdevicestatus_isonline = (cursmartdevice,SettingOfflineMinutes=20)=>{
  let isonline = false;
  let lastupdatetime = lodashget(cursmartdevice,'realtimedata.lastupdatetime');
  if(!!lastupdatetime){
    // a.diff(b, 'days')
    const diffmin = moment().diff(moment(lastupdatetime),'minutes');
    isonline = diffmin < SettingOfflineMinutes;
  }
  return isonline;
}

export default getdevicestatus_isonline;

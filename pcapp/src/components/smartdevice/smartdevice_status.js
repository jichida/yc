import React from 'react';
import lodashget from 'lodash.get';
import getdevicestatus_isonline from '../../util/issmartdeviceonline';

const SmartDeviceStatus = (props)=>{
  const {cursmartdevice,SettingOfflineMinutes} = props;
  const isonline = getdevicestatus_isonline(cursmartdevice,SettingOfflineMinutes);
  return [
      <div className="device-info" key="1">
      <span className="device-name">智能床ID:{lodashget(cursmartdevice,'deviceid','')}</span>
      <span>设备状态：<font>{lodashget(cursmartdevice,'realtimedata.establishstatus','')}</font></span>
      <span>气垫方位：<font>{lodashget(cursmartdevice,'realtimedata.positionstring','')}</font></span>
      <span>气垫角度：<font>{lodashget(cursmartdevice,'realtimedata.anglestring','')}</font></span>
    </div>,
    <div className="device-info" key="2" style={{marginBottom: '30px'}}>
    <span>当前姿态建立状态：<font>{lodashget(cursmartdevice,'realtimedata.establishstatusstring','')}</font></span>
    <span>最后上报时间：<font className="warn-color">{lodashget(cursmartdevice,'realtimedata.lastupdatetime','')}</font></span>
    <span><font className="warn-color">{isonline?'在线':'离线'}</font></span>
    </div>
  ];
}

export default SmartDeviceStatus;

import React from 'react';
import lodashget from 'lodash.get';

const ReviewDetailInfo = (props)=>{
//姓名
// 护士
// 设备
// 翻身时间
// 翻身描述
// 发送状态
	const {info,db} = props;
	const curpaientinfo = db.paientinfos[info.userpatientid];
	if(!curpaientinfo){
		return <tr></tr>
	}
	const Patientname = lodashget(curpaientinfo,'Patientname','');
	const Staffname = lodashget(info,'usercreatorid.Staffname','');
	const Devicename = lodashget(info,'smartdeviceid.deviceid','');
	const TurnoverTime = lodashget(info,'created_at','');
	const descriptionstring = lodashget(info,'descriptionstring','');
	const sendstatus = lodashget(info,'sendstatus','');
	return (
		<tr>
			<td><div align="center">{Patientname}</div></td>
			<td><div align="center">{Staffname}</div></td>
			<td><div align="center">{Devicename}</div></td>
			<td><div align="center">{TurnoverTime}</div></td>
			<td><div align="center">{descriptionstring}</div></td>
			<td><div align="center">{sendstatus}</div></td>
		</tr>
	)
}

export default ReviewDetailInfo;

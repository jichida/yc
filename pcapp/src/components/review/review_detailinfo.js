import React from 'react';
import lodashget from 'lodash.get';

const ReviewDetailInfo = (props)=>{
	const {info,onClickDetail,db} = props;
	const curpaientinfo = db.paientinfos[info.userpatientid];
	if(!curpaientinfo){
		return <tr></tr>
	}
	const curdepat = db.depats[curpaientinfo.depatid];
	const {evaluatebardenscore,created_at} = info;
	const Patientname = lodashget(curpaientinfo,'Patientname','');
	const Patientno = lodashget(curpaientinfo,'Patientno','');
	const Staffname = info.usercreatorid.Staffname;

	// const bedStatusString = lodashget(curpaientinfo,'bedid','') === ''?'离床':'在床';
	const depatName = curdepat.Depatname;
	let ApprovalStatus= lodashget(info,'stagestatus','未审核');
	const isid2 = curpaientinfo.formreviewlapsetoid === info._id? '0':'1';
	// const bedName = lodashget(curpaientinfo,'bedid.Bedname','');
	// const smartDeviceString = lodashget(curpaientinfo,'bedid.smartdeviceid.realtimedata.positionstring','') + lodashget(curpaientinfo,'bedid.smartdeviceid.realtimedata.anglestring','');
	// const isInSmartBed = lodashget(curpaientinfo,'bedid.smartdeviceid','')===''?false:true;
	// const stateClassname = bedStatusString==='在床'?'statein':'stateoff';
	return (
		<tr>
			<td><div align="center">{Patientname}</div></td>
			<td><div align="center">{Patientno}</div></td>
			<td><div align="center">{depatName}</div></td>
			<td><div align="center">{created_at}</div></td>
			<td><div align="center">{evaluatebardenscore}</div></td>
			<td><div align="center">{Staffname}</div></td>
			<td><div align="center">{ApprovalStatus}</div></td>
			<td><div align="center"  onClick={
				()=>{
					onClickDetail(info.userpatientid,info._id,isid2);
				}
			}>查看</div></td>
		</tr>
	)
}

export default ReviewDetailInfo;

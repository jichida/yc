import React from 'react';
import lodashget from 'lodash.get';

const ReviewDetailInfo = (props)=>{
	const {info, onClickDetail, db, onClickEvaluate} = props;
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
	const SexString = lodashget(curpaientinfo,'SexString','男');
	const Patientbirth = lodashget(curpaientinfo,'birth','1989-10');
	const Indate = '';
	const Outdate = '';
	const Inhospital = false;
	const Diseaseclassification = '普通病人';
	const Bedno = '19'
	// const bedName = lodashget(curpaientinfo,'bedid.Bedname','');
	// const smartDeviceString = lodashget(curpaientinfo,'bedid.smartdeviceid.realtimedata.positionstring','') + lodashget(curpaientinfo,'bedid.smartdeviceid.realtimedata.anglestring','');
	// const isInSmartBed = lodashget(curpaientinfo,'bedid.smartdeviceid','')===''?false:true;
	// const stateClassname = bedStatusString==='在床'?'statein':'stateoff';
	return (
		<tr>
			<td><div align="center">{Patientno}</div></td>
			<td><div align="center">{Patientname}</div></td>
			<td><div align="center">{SexString}</div></td>
			<td><div align="center">{Patientbirth}</div></td>
			<td><div align="center">{Indate}</div></td>
			<td><div align="center">{Outdate}</div></td>
			<td><div align="center">{Inhospital}</div></td>
			<td><div align="center">{depatName}</div></td>
			<td><div align="center">{Diseaseclassification}</div></td>
			<td><div align="center">{Bedno}</div></td>
			<td>
				<div align="center"  onClick={()=>{onClickDetail(info.userpatientid,info._id,isid2);}}>详情</div>
				<div align="center"  onClick={()=>{onClickEvaluate(info.userpatientid,info._id,isid2);}}>评估</div>
			</td>
		</tr>
	)
}

export default ReviewDetailInfo;

import { normalize, schema } from 'normalizr';
// import lodashmap from 'lodash.map';
// import lodashget from 'lodash.get';
// Define a users schema
const smartdevice = new schema.Entity('smartdevices',{},{
  idAttribute: '_id',
});

const bed = new schema.Entity('beds',{
    smartdeviceid:smartdevice
},{
  idAttribute: '_id',
});

const depat =  new schema.Entity('depats',{},{
  idAttribute: '_id',
});

const user = new schema.Entity('users',{},{
  idAttribute: '_id',
});


const evaluatebarden =  new schema.Entity('evaluatebardens',{
  usercreatorid:user,
  signed_nurse:user,
  signed_headnurse:user,
},{
  idAttribute: '_id',
});

const evaluatewoundsurface =  new schema.Entity('evaluatewoundsurfaces',{
  usercreatorid:user,
  signed_nurse:user,
  signed_headnurse:user,
},{
  idAttribute: '_id',
});

const evaluatenursingmeasures =  new schema.Entity('evaluatenursingmeasuress',{
  usercreatorid:user,
  signed_nurse:user,
  signed_headnurse:user,
},{
  idAttribute: '_id',
});

const formreviewlapseto =  new schema.Entity('formreviewlapsetos',{
  usercreatorid:user,
  signed_nurse:user,
  signed_headnurse:user,
  signed_nursingdepartment:user,
},{
  idAttribute: '_id',
});

const turnoverrecord =  new schema.Entity('turnoverrecords',{
  usercreatorid:user,
  smartdeviceid:smartdevice,
},{
  idAttribute: '_id',
});

const paientinfo = new schema.Entity('paientinfos', {
  bedid:bed,
  depatid:depat,
  evaluatebardensignheadnurseid:user,
  evaluatenursingmeasuressignheadnurseid:user,
  firstevaluatebardenid:evaluatebarden,
  firstevaluatewoundsurfaceid:evaluatewoundsurface,
  firstevaluatenursingmeasuresid:evaluatenursingmeasures,
  formreviewlapsetoid:formreviewlapseto,
  formreviewlapsetoid2:formreviewlapseto,
},{idAttribute: '_id'});

const paientinfoListSchma = {docs:[paientinfo]};
const normalizr_paientinfo =(resultlist)=>{
  const {entities}= normalize(resultlist, paientinfoListSchma);
  return entities;
};

const evaluatebardenListSchma = {list:[evaluatebarden]};
const normalizr_evaluatebarden = (resultlist)=>{
  const {entities}= normalize(resultlist, evaluatebardenListSchma);
  return entities;
}

const evaluatewoundsurfaceListSchma = {list:[evaluatewoundsurface]};
const normalizr_evaluatewoundsurface = (resultlist)=>{
  const {entities}= normalize(resultlist, evaluatewoundsurfaceListSchma);
  return entities;
}

const evaluatenursingmeasuresListSchma = {list:[evaluatenursingmeasures]};
const normalizr_evaluatenursingmeasures = (resultlist)=>{
  const {entities}= normalize(resultlist, evaluatenursingmeasuresListSchma);
  return entities;
}

const formreviewlapsetoListSchma = {list:[formreviewlapseto]};
const normalizr_formreviewlapseto = (resultlist)=>{
  const {entities}= normalize(resultlist, formreviewlapsetoListSchma);
  return entities;
}

const turnoverrecordListSchma = {list:[turnoverrecord]};
const normalizr_turnoverrecord = (resultlist)=>{
  const {entities}= normalize(resultlist, turnoverrecordListSchma);
  return entities;
}

export {
  normalizr_paientinfo,
  normalizr_evaluatebarden,
  normalizr_evaluatewoundsurface,
  normalizr_evaluatenursingmeasures,
  normalizr_formreviewlapseto,
  normalizr_turnoverrecord
};

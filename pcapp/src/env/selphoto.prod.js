import imageA from './IMG_3861.JPG';
let xviewUploadImage;

xviewUploadImage = (param,callback)=>{
  callback({
    code:0,
    message:'success',
    data:[imageA]
  })
};


export {xviewUploadImage};

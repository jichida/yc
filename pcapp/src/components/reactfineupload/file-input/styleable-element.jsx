import React from 'react'
import convert from './base64toblob';


const containerStyle = {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
}

const inputStyle = {
    bottom: 0,
    height: '100%',
    left: 0,
    margin: 0,
    opacity: 0,
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%'
}

// const StyleableFileInput = ({ children, className, onChange, ...params }) => (
//     <div className={ `react-fine-uploader-file-input-container ${className || ''}` }
//          style={ containerStyle }
//     >
//         { children }
//         <input { ...params }
//                className='react-fine-uploader-file-input'
//                onChange={ onChange }
//                style={ inputStyle }
//                type='file'
//         />
//     </div>
// )

// const xviewUploadImage = (param,callback)=>{
//   callback({
//     code:0,
//     message:'success',
//     data:[ImageA,ImageB,ImageC]
//   })
// };

const getRandomName = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const msecond = date.getMilliseconds()
    const random = Math.round(Math.random()*100)
  
    return [year, month, day].map(formatNumber).join('') +  [hour, minute, second, msecond].map(formatNumber).join('') + random;
}
  
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const StyleableFileInput = ({ children, className, onChange, xviewUploadImage, ...params }) => {

    const onClickSelPhoto = ()=>{
        let changeEvent = {
            target: []
        }
        xviewUploadImage({},(result)=>{
            for( const item of result.data){
                let blob = convert(item);
                let index = blob.type.indexOf('/') + 1;
                let type = blob.type.substring(index);
                let name = getRandomName() + '.' + type;
                changeEvent.target.push({blob, name})
            }

            onChange(changeEvent);
        });
    }

    return (
      <div className={ `react-fine-uploader-file-input-container ${className || ''}` }
           style={ containerStyle }
      >
          { children }
          { xviewUploadImage ?
                (<div
                        className='react-fine-uploader-file-input'
                        onClick ={ onClickSelPhoto }
                        style={ inputStyle }
                        type='file'
                />)
                : (<input { ...params }
                    className='react-fine-uploader-file-input'
                    onChange={ onChange }
                    style={ inputStyle }
                    type='file'
                    />
                )
          }
      </div>
  );
}


/*
html input标签修改为原生
方法名：
    xviewUploadImage
参数：
    {
       "maxnumber": 图片的最大数量(不超过9)
       "color"    : 导航栏颜色(string)  例:"0xffffff"
       "callback" :回调方法名
    }
回调参数：
    {
        "code"   :"0/-1"
        "message":"success/failure"
        "data"   : 图片数组 (base64的string) / 空数组
    }

*/
export default StyleableFileInput

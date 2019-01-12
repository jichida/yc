/** 将base64转换为文件对象
 *  @param {String} base64 base64字符串
 * */
const convertBase64ToBlob = (base64) => {
    let base64Arr = base64.split(',');
    let imgtype = '';
    let base64String = '';
    if(base64Arr.length > 1){
        //如果是图片base64，去掉头信息
        base64String = base64Arr[1];
        imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':')+1,base64Arr[0].indexOf(';'));
    }
    // 将base64解码
    let bytes = atob(base64String);
    //var bytes = base64;
    let bytesCode = new ArrayBuffer(bytes.length);
     // 转换为类型化数组
    let byteArray = new Uint8Array(bytesCode);
    
    // 将base64转换为ascii码
    for (let i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i);
    }
   
    // 生成Blob对象（文件对象）
    return new Blob( [bytesCode] , {type : imgtype});
};

export default convertBase64ToBlob;
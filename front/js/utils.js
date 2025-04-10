function getBase64(file) {
    return new Promise((resolve, reject) => {
         var reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = function () {
             resolve(getStringBase64(reader.result.toString()) /*reader.result.toString().replace(/^data:(.*,)?/, '')*/);
         };
         reader.onerror = function (error) {
             reject(error);
         };
     });      
  };

  function getStringBase64(strBase64){
    let result = strBase64.replace(/^data:(.*,)?/, '') ;
    return result;
  }
 
  export {getBase64,getStringBase64};
/**
   Modal.alert({message:"alert"})
  Modal.confirm({
    title: "ssss",
    message: "sfsdfsd",
    beforeClose:(type: string) => {
      if(type === 'cancel'){
        return new Promise((resolve,reject) => {
          setTimeout(() => {
            console.log(0);
            resolve(false)
          },2000)
        })
        // return false;
      }
    }
  }).then((ret: string) => {
    console.log(ret);
  }).catch((ret: string) => {
    console.log(ret);
  })
*/
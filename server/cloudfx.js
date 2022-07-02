Moralis.Cloud.beforeSave("ElemonSales",async(req)=>{

    //const data =req.obj.attributes
     console.log(req.obj)
   Moralis.Cloud.httpRequest({
       method:"POST",
         url:"http://35.196.73.50/api/newitem",
     body:req.obj,
     headers:{
     'Content-type':'application/json',
       
     }
   })
   })
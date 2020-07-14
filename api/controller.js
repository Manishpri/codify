const { agencyschema } = require('./model');
const { clientschema } = require('./model');

class controller { 
    static async create (req,res){
        try{
            if(req.body == '' || req.body == null || req.body == undefined){
                res.status(400).json({
                    status : 'error',
                    message : 'Body Parameter is missing'
                })
            }else{
                if(req.body.agency){
                    const agencyModel = new agencyschema(req.body.agency);
                    await agencyModel.save().then(response=>{
                        if(!response){
                            res.status(500).json({
                                status : 'error',
                                error : "Data Not Saved, Internal server error"
                            })
                        }else{
                            let agencyId = response._id
                            if(req.body.client == '' || req.body.client == null || req.body.client == undefined){
                                res.status(400).json({
                                    status:'error',
                                    message : 'No client for this agency'
                                })
                            }else{
                                let obj={}
                                for(let i=0;i<req.body.client.length;i++){
                                     obj={
                                        agencyId:agencyId,
                                        name : req.body.client[i].name,
                                        email : req.body.client[i].email,
                                        phoneNum : req.body.client[i].phoneNum,
                                        totalBill : req.body.client[i].totalBill,   
                                    }
                                    const clientModel = new clientschema(obj);
                                    clientModel.save()
                                }
                                     
                            }
                            res.status(200).json({
                                status:'success',
                                message:'client associate to agency'
                            })
                           
                        }
                    }).catch(error=>{
                        res.status(404).json({
                            status:'error',
                            message:error
                        })
                    })
                }else{
                    res.status(404).json({
                        status:'error',
                        message : 'No agency available'
                    })
                } 
            }
        }catch(error){
            res.status(500).json({
                status:'error',
                error:error
            })
        }
     
    }
static async update(req,res){
    try{
        if(req.body == '' || req.body == null || req.body == undefined){
            res.status(400).json({
                status : 'error',
                message : 'Body Parameter is missing'
            })
        }else{
           clientschema.findOneAndUpdate({_id:req.params._id},
            {
              name:req.body.name,
              email:req.body.email,
              phoneNum : req.body.phoneNum,
              totalBill : req.body.totalBill  
            }
            ,{new:true}).then(response=>{
                res.status(200).json({
                    status:'success',
                    message:'client updated successfully',
                    response:response
                }).catch(error=>{
                    res.status(404).json({
                        status:'error',
                        error:error
                    }) 
                })
            })
        }
    }catch(error){
        res.status(500).json({
            status:'error',
            error:error
        })
    }
}

static async find(req,res){
    try{
        let obj={}
        clientschema.find().sort({totalBill:-1}).limit(1).then(client_response=>{
            let agencyId = client_response[0].agencyId;
            obj['client'] = client_response;
           agencyschema.find({_id : agencyId}).then(agency_response=>{
              
               obj['agencyName'] = agency_response[0].name;
               res.status(200).json({
                   status:'success',
                   response : obj
               })
           }).catch(error=>{
               res.status(404).json({
                   status:'error',
                   error:error
               })
           })
        })
       
    }catch(error){
        res.status(500).json({
            status:'error',
            error:error
        })
    }
}
};

module.exports = controller
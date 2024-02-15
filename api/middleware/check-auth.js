const jwt = require('jsonwebtoken')

module.exports = (req,resp,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token,'this is dummy text')
        //console.log(verify)

        //--for use adimn user ------
        if(verify.userType == 'admin')
        {
            next();
        }
        else{
            return resp.status(401).json({
                msg:'not admin'
            })
        }

       
    }
    catch{
        return resp.status(401).json({
            msg:'Invalid token'
        })
    }
}
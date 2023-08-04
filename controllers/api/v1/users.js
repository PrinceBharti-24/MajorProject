const jwt = require('jsonwebtoken');
const User = require('../../../models/users');

module.exports.createSession = async function(req, res){

    try{
        let user = await User.findOne({email : req.body.email});
        console.log(req.body);

        if(!user || user.password != req.body.password){
            console.log(user.password +" : "+req.body.password)
            return res.status(401).json({
                message: "Invalid Username or Password"
            })
        }
        else{
            return res.status(200).json({
                data: {
                    token: jwt.sign(user.toJSON(), 'secret' , {expiresIn: '100000'})
                },
                message: "Sign in Successful ans Token created Keep it safe"
            })
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
const jwt = require('jsonwebtoken');

const secret = 'rippedoffappnamefromnike';
const expiration = '1h';

module.exports = {
    //this function takes the user email,id and username and return them as a json web token
    signToken: function({username,email, _id}){
        const payload = {username,email,_id};

        return jwt.sign({data:payload},secret,{expiresIn:expiration});
    }, 
    //this function acts as a middleware that grabs the token from headers or body or req
    authMiddleware: function({req}){
        let token = req.body.token || req.query.token || req.headers.authorization;

        if(req.headers.authorization){
            token = token.split(' ').pop().trim();
        }

        if(!token){
            return req;
        }

        try{
            const {data} = jwt.verify(token,secret,{maxAge:expiration});
            req.user = data;
        }catch{
            console.log('Token validation failed');
        }

        return req;
    }
};
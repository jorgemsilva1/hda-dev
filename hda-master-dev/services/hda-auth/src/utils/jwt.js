const jwt = require('jsonwebtoken');

// https://github.com/SkyLothar/lua-resty-jwt
// https://www.npmjs.com/package/jsonwebtoken

exports.generateJWT = body => {
    return jwt.sign({
        ...body
    }, 'thatssomesuperultrasecretyoucouldneverimagine', 
    { 
        algorithm: 'HS256',
        expiresIn: '1h'
    })
};
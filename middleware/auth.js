const jwt = require('jsonwebtoken');

module.exports.authValidation = (req) => {
    const authHeader = req.get('Authorization');
    let authBody = { isAuthenticated: false };
    if (!authHeader) return authBody;

    const token = authHeader.split(' ')[1];
    if(!token) return authBody;
    
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somerandomkey')
    } catch(err) {
        return authBody;
    }
    if(!decodedToken) return authBody;

    authBody.isAuthenticated = true;
    authBody.id = decodedToken.id;
    authBody.userType = decodedToken.userType;
    return authBody;
}
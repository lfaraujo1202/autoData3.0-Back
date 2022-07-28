const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;  

    if(!authHeader)
        return res.status(401).send({ error: 'Token is missing'});

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token invalid'});
    
    const [ scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Wrong token pattern'});

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid'});

        req.userId = decoded.id;
        return next();
    });
};
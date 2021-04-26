import jwt from 'jsonwebtoken';
import configs from '../config/config.json';

export class authenticate {

    authenticateUser(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const verifyToken = jwt.verify(token, configs.server.jwtSign);
            if(verifyToken) {
                req.user = verifyToken;
                return next();
            }
        } catch (error) {
            res.json({ error: 'ERROR0001: Error validating user', innerError: error });
        }
    }

    generateToken(data: any) {
        try {
            return jwt.sign(data, configs.server.jwtSign)
        } catch (error) {
            return error;
        }        
    }
}
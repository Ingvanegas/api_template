import { authenticate } from '../security/authenticate';
import { Manager } from './manager';

export class loginController {

    configs;
    manager;
    
    constructor(configs, manager: Manager) {
        this.configs = configs
        this.manager = manager;
    }
    
    async get(req, res, next) {

        let result;
        try {
            result = await this.manager.get(
                `SELECT id, username, name, last_name, role, dateexpire, email, now() as currentdate 
                FROM user
                WHERE username = "${req.query.iduser}" AND password = "${req.query.password}" AND visible = 1;`);
            if(result.length > 0) {
              return  new authenticate().generateToken(result[0]);
            }
        } catch (error) {
            next(error);
        }       
        res.json(result);
    }
}
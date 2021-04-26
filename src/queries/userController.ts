import { user } from '../model/user';
import { Manager } from './manager';

export class userController {

    configs: any;
    manager: any;

    constructor(configs: any, manager: Manager) {
        this.configs = configs;
        this.manager = manager;
    }

    async getAll(req, res, next) {
        let result;
        try {
            result = ['hi'];
        } catch (error) {
            next(error);
        }
        res.json(result);
    }

    async get(req, res, next) {
        let result;
        try {
            result = await this.manager.get(
                `SELECT *
                FROM user
                WHERE id = "${req.query.id}";`);
        } catch (error) {
            next(error);
        }
        res.json(result);
    }

    public async createOrUpdate(req, res, next) {
        const userInfo: user = req.body;
        if (userInfo.id) {
            const userdExist: any[] = await this.manager.get(
                `SELECT *
                FROM user  
                WHERE username = "${userInfo.username}";`);
            if (userdExist && userdExist.length > 0) {
                res.status(400).send({
                    errorCode: 'Error0004',
                    error: `the id user ${userInfo.id} already exist`
                })
            } else {
                this.add(req, res, next);
            }
        } else {
            this.update(req, res, next);
        }
    }

    private async add(req, res, next) {
        try {
            const userInfo: user = req.body;
            const resultAction = await this.manager.action(`
            INSERT INTO user (username, password,identification , name, last_name, address, phone, email, role, datecreation, dateexpire)
            VALUES ("${userInfo.username}", "${userInfo.password}","${userInfo.identification}", "${userInfo.name}", 
            "${userInfo.last_name}", "${userInfo.address}", "${userInfo.phone}", "${userInfo.email}", ${userInfo.role}, NOW(),
            DATE_ADD(NOW(), INTERVAL 1 YEAR));`);
            if (resultAction == 0) {
                next('A error was ocurred');
            } else {
                userInfo.id = resultAction[0].insertId;
                res.json(userInfo);
            }
        } catch (error) {
            next(error);
        }
    }

    private async update(req, res, next) {
        try {
            const userInfo: user = req.body;
            const resultAction = await this.manager.action(`
            UPDATE user SET username =  "${userInfo.username}", password = "${userInfo.password}", 
            identification = "${userInfo.identification}",
            name = "${userInfo.name}", last_name =  "${userInfo.last_name}", address = "${userInfo.address}", 
            phone = "${userInfo.phone}", email = "${userInfo.email}", role = ${userInfo.role} 
            WHERE id = ${userInfo.id};`);
            if (resultAction[0].affectedRows == 0) {
                next('user not found');
            } else {
                res.json(userInfo);
            }
        } catch (error) {
            next(error);
        }
    }

    async hiddenUser(req, res, next) {
        try {
            const userInfo: user = req.body;
            const resultAction = await this.manager.action(`
            UPDATE user SET visible = 0 
            WHERE id = ${userInfo.id};`);
            if (resultAction[0].affectedRows == 0) {
                res.status(404).send({
                    error: 'user not found'
                })
            } else {
                res.json(userInfo);
            }
        } catch (error) {
            next(error);
        }
    }

    async renewMembershipUser(req, res, next) {
        try {
            const userInfo: user = req.body;
            const resultAction = await this.manager.action(`
            UPDATE user SET dateexpire = '${userInfo.dateexpire}'
            WHERE id = ${userInfo.id};`);
            if (resultAction[0].affectedRows == 0) {
                res.status(404).send({
                    error: 'user not found'
                })
            } else {
                res.json(userInfo);
            }
        } catch (error) {
            next(error);
        }
    }

    public async delete(req, res, next) {
        const userInfo: user = req.body;
        const resultAction = await this.manager.action(`DELETE FROM user WHERE id = ${userInfo.id};`);
        if (resultAction[0].affectedRows == 0) {
            res.status(404).send({
                error: 'user not found'
            })
        } else {
            res.json(1);
        }
    }
}
const express = require('express');
const router = express.Router();
const logger = require('winston');
import {userService} from "../services/userService";

/* GET user. */
router.get('/getUserByName', (req, res) => {

    return userService.findUser()
        .then((result) => {
            res.send({result});
            logger.debug('getUserByName finish correctly' );
        })
        .catch((err) => {
            logger.error('getUserByName failure: ' + err.message );
        });
});
/* GET user. */
router.post('/setUser', (req, res) => {

    return userService.saveUser(req.params)
        .then((result) => {
            res.send({result});
            logger.debug('getUserByName finish correctly' );
        })
        .catch((err) => {
            logger.error('getUserByName failure: ' + err.message );
        });
});

module.exports = router;
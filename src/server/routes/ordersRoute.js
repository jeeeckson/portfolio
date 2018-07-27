const express = require('express');
const router = express.Router();
import logger from './../../winston-configurer';
import {orderService} from "../services/orderService";

/* GET user. */
router.get('/getOrders', (req, res) => {

    return orderService.findOrders()
        .then((result) => {
            res.send({result});
            logger.debug('getUserByName finish correctly' );
        })
        .catch((err) => {
            logger.error('getUserByName failure: ' + err.message );
        });
});
/* GET user. */
router.get('/getOrdersById', (req, res) => {

    return orderService.findOrderById(req.query.id)
        .then((result) => {
            res.send({result});
            logger.debug('getUserByName finish correctly' );
        })
        .catch((err) => {
            logger.error('getUserByName failure: ' + err.message );
        });
});

module.exports = router;

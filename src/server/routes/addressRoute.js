const express = require('express');
const router = express.Router();
const logger = require('winston');
import {addressService} from "../services/addressService";

/* GET address. */
router.get('/getAddressByName', (req, res) => {

    return addressService.findAddressByUser(req.params.username)
        .then((result) => {
            res.send({'totalProduct': result});
            logger.debug('getAddressByName finish correctly' );
        })
        .catch((err) => {
            logger.error('getAddressByName failure: ' + err.message );
        });
});
/* GET address. */
router.post('/setAddress', (req, res) => {

    return addressService.saveAddress(req.params)
        .then((result) => {
            res.send({'totalProduct': result});
            logger.debug('getAddressByName finish correctly');
        })
        .catch((err) => {
            logger.error('getAddressByName failure: ' + err.message);
        });
});

module.exports = router;

const express = require('express');
const auth = require('../middleware/auth');
const {addPhone, getPhones, getOnePhone, updatePhone, deletePhone} = require('../controllers/phoneController');

const router = express.Router();

router.post('/phone', auth, addPhone);
router.get('/phones', auth,  getPhones);
router.get('/phone/:id',auth, getOnePhone);
router.put('/phone/:id', auth, updatePhone);
router.delete('/phone/:id', auth, deletePhone);


module.exports = {
    routes: router
}
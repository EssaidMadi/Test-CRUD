const { model } = require('mongoose');
const {Phones, validate} = require('../models/phones');


const addPhone = async (req, res, next) => {
        const {error} =  validate(req.body);
        if(error) return res.status(422).send(error.details[0].message);

        let phone = new Phones({
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            rating: req.body.rating,
            warranty_years: req.body.warranty_years,
            available: req.body.available
        });

        phone =  await phone.save(); 
        res.send(phone);
}

const getPhones = async (req, res, next) => {
    const phones = await Phones.find().sort('name').exec();
    res.send(phones);
}

const getOnePhone = async (req, res, next) => {
    const phone = await Phones.findById(req.params.id);
    if(!phone) return res.status(401).send('The Phone with the given id not found');

    res.send(phone);
}

const updatePhone = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);

    let phone = await Phones.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rating: req.body.rating,
        warranty_years: req.body.warranty_years,
        available: req.body.available
    }, {new: true});

    if(!phone) return res.status(401).send('The phone with the given id not found');
    res.send(phone);
}

const deletePhone = async (req, res, next) => {
    const phone = await Phones.findByIdAndRemove(req.params.id);
    if(!phone) return res.status(401).send('The Phone with the given id not found');

    res.send(phone);
}


module.exports = {
    addPhone,
    getPhones,
    getOnePhone,
    updatePhone,
    deletePhone
}
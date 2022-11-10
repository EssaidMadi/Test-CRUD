const mongoose = require('mongoose');
const Joi = require('joi');

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50, 
    },
    type: {
        type: String,
        minlength: 5,
        maxlength: 55,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    warranty_years: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Phones = mongoose.model('Phones', phoneSchema);

const validatePhones = (phones) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        type: Joi.string().min(5).max(200).required(),
        price: Joi.number().required(),
        rating: Joi.number().required(),
        warranty_years: Joi.number().required(),
        available: Joi.boolean().required()
    }

    return Joi.validate(phones, schema);
}

exports.Phones = Phones;
exports.validate = validatePhones;
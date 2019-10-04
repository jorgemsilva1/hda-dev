const express = require('express');
const Joi = require('joi');
const userSchema = require('./auth.schema');
const { User } = require('../../../db/models').sequelize.models;
const { generateJWT } = require('../../utils/jwt');
// https://stackoverflow.com/questions/48799894/trying-to-hash-a-password-using-bcrypt-inside-an-async-function
const bcrypt = require('bcryptjs');

// METHODS

exports.get = async (req, res, next) => {
    try {
        if (!req.params) 
            throw new Error('Invalid params sent.');
    
        const users = await User.findAll();
        
        if (!users)
            throw new Error('No users were found.');

        res.status(200).json({ users });
    } catch (err) {
        // to change err log
        console.log(err);
        res.status(500).json({ error: err })
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!req.params) 
            throw new Error('Invalid params sent.');
    
        const user = await User.findOne({ where: { id } });
        
        if (!user)
            throw new Error('No user was found.');

        res.status(200).json({ user });
    } catch (err) {
        // to change err log
        console.log(err);
        res.status(500).json({ error: err })
    }
};

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!req.body) 
            throw new Error('Invalid request body.');

        const schemaValidation = Joi.validate(req.body, userSchema);

        if (schemaValidation.error)
            throw new Error('Please insert valid data');

        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) 
                    throw new Error(`Couldn't hash your password.`);

                resolve(hash)
            });
        });
            
        const isRegistered = await User.findOne({ where: { email } });
        
        if (isRegistered)
            throw new Error('User already created.');
        
        const user = await User.create({ email, password: hashedPassword });
        res.status(200).json({ user })
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!req.body) 
            throw new Error('Invalid request body.');

        const schemaValidation = Joi.validate(req.body, userSchema);

        if (schemaValidation.error)
            throw new Error('Please insert valid data');
    
        const user = await User.findOne({ where: { email } });
        
        if (!user)
            throw new Error('No user was found.');

        const validPwd = await bcrypt.compare(password, user.password);

        if (!validPwd)
            throw new Error('Invalid password, please re-write it.')

        const token = generateJWT({ email, password });

        res.status(200).json({ token });
    } catch (err) {
        // to change err log
        console.log(err);
        res.status(500).json({ error: err })
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!req.params) 
            throw new Error('Invalid params sent.');
    
        const user = await User.findOne({ where: { id } });
        
        if (!user)
            throw new Error('No user was found.');

        user.firstName = req.body.firstName ? req.body.firstName : null;
        user.lastName = req.body.lastName ? req.body.lastName : null;
        user.email = req.body.email ? req.body.email : null;
        user.password = req.body.password ? req.body.password : null;

        const updatedUser = await user.save();

        res.status(200).json({ updatedUser });
    } catch(err) {
        // to change err log
        console.log(err);
        res.status(500).json({ error: err })        
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!req.params) 
            throw new Error('Invalid params sent.');
    
        const res = await User.destroy({ where: { id } });
        
        if (!res)
            throw new Error(`Couldn't delete the user.`);

        res.status(200).json({ updatedUser });
    } catch(err) {
        // to change err log
        console.log(err);
        res.status(500).json({ error: err })        
    }
};


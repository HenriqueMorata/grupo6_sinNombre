const {body} = require('express-validator');
const moment = require('moment');

module.exports = {
    Registration: [
        body('name').notEmpty().withMessage('Field cannot be empty!'),

        body('lastname').notEmpty().withMessage('Field cannot be empty!'),

        body('day').notEmpty().withMessage('Enter a valid birthday!')
                   .custom((day, {req}) => {
                       let info = req.body;

                        if (isNaN(day) || isNaN(info.month) || isNaN(info.year)) {
                            throw new Error('Invalid Date');
                        }

                        let birthdate = new Date(info.year + '/' + info.month + '/' + day);
                        let age = moment.duration({from: birthdate, to: new Date});

                        if (age.asYears() < 13) {
                            throw new Error('You must be at least 18 years old!');
                        }
                        return true;
                    }),

        body('gender').notEmpty().withMessage('Please choose one of the options!'),

        body('email').isEmail().withMessage('Enter a valid email!'),

        body('password').notEmpty().withMessage('Enter a password!')
                        .isLength(8).withMessage('Password is too short'),

        body('confirmation').notEmpty().withMessage('Repeat your password for confirmation!')
                            .custom((value, {req}) => {
                                if (value != req.body.password) {
                                    throw new Error('Password confirmation does not match')
                                }
                                return true;
                            })
    ],

    Login: [
        body('email').custom((value, {req}) => {
            if (!value || !req.body.password) {
                throw new Error('Enter valid credentials!');
            }
            
            return true;
        })
    ]
}
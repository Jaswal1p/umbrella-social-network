const { Users } = require('../models');

// setup of users controller
const usersController = {
    // create a new user
    createUsers({body}, res) {
        Users.create(body)
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => res.status(400).json(err));
    },

    
};

module.exports = usersController;
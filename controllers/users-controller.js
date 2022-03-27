const { Users } = require('../models');

// setup of users controller
const usersController = {
    // create a new user
    createUsers({body}, res) {
        Users.create(body)
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => res.status(400).json(err));
    },

    // get all users
    getAllUsers(req, res) {
        Users.find({})

          .then(dbUsersData => res.json(dbUsersData))
          .catch(err => {
              console.log(err);
              res.status(404).json(err);
          });
    },
    
    // get single user by id
    getUsersById({params}, res) {
        Users.findOne({_id: params.id })
          
          .then(dbUsersData => {
              if(!dbUsersData) {
                  res.status(404).json({message: 'No User with this id!'});
                  return;
              }
              res.json(dbUsersData) 
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },


};

module.exports = usersController;
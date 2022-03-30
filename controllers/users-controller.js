const { Users, Thoughts } = require('../models');

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

        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        // populate user friends
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        // .sort({_id: -1})  

          .then(dbUsersData => res.json(dbUsersData))
          .catch(err => {
              console.log(err);
              res.status(404).json(err);
          });
    },
    
    // get single user by id
    getUsersById({params}, res) {
        Users.findOne({_id: params.id })
        
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        // return if no user is found

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
    
    // update a user by its id
    updateUsers({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
         
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


    // DELETE /api/users/:id
    deleteUsers({ params }, res) {
        // delete the user
        Users.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            // this is to remove the user from any friends arrays
            Users.updateMany(
                { _id : {$in: dbUserData.friends } },
                { $pull: { friends: params.id } }
            )
            .then(() => {
                // this is to remove any thoughts by this particular user
                Thoughts.deleteMany({ username : dbUserData.username })
                .then(() => {
                    res.json({message: "Successfully deleted user, his/her thoughts & dropped from friends"});
                })
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    },


    // delete a user by its id
    // deleteUsers({params, body}, res) {
    //     Users.findOneAndDelete({_id: params.id})
         
    //     .then(dbUsersData => {
    //         if(!dbUsersData) {
    //             res.status(404).json({message: 'No User with this id!'});
    //             return;
    //         }
    //         // this is to remove the user from any friends arrays
    //         Users.updateMany(
    //             { _id : {$in: dbUsersData.friends } },
    //             { $pull: { friends: params.id } }
    //         )
    //         .then(() => {
    //         // this is to remove any thoughts by this particular user
    //             Thoughts.deleteMany({ username : dbUsersData.username })
    //             .then(() => {
    //                 res.json({message: "Successfully deleted user & his/her thoughts"})
    //             })
    //             .catch(err => res.status(400).json(err));
    //         })
    //         .catch(err => res.status(400).json(err));
    //         res.json(dbUsersData) 
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(400).json(err);
    //     });
    // },

    // add a friend
    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(404).json({message: 'There is no User with this ID!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.json(err));
    },

    // Delete a current Friend
    deleteFriend({ params }, res) {
        Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'There is No User with this ID!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = usersController;
// we have to require thoughts and users models
const { Thoughts, Users } = require('../models');

// thoughts controller ( would sound weird to a non developer !! )
const thoughtsController = {

    // method to create a new thought
    createThoughts({params, body}, res) {
        Thoughts.create(body)
            .then(({_id}) => {
                return Users.findOneAndUpdate(
                    { _id: params.userId}, 
                    {$push: {thoughts: _id}}, 
                    {new: true}
                );
            })
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({message: 'No thoughts with users id!'});
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => res.json(err));
    },


    // method to Get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})

            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            // .sort({_id: -1})
            
           .then(dbThoughtsData => res.json(dbThoughtsData))
           .catch(err => {
               console.log(err);
               res.status(500).json(err);
           });
    },


    // method to get 'A single' thought by id
    getThoughtById({params}, res) {
        Thoughts.findOne({ _id: params.id })

            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')

            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({message: 'No thought found with this id number!'});
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    }, 

    // update a particular thought by finding it with its id 
    updateThoughts({params, body}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id},
            body,
            {new: true, runValidators: true}
        )

        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-___v')

        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No thought found with this id number!'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // delete A thought by id
    deleteThoughts({params}, res) {
        Thoughts.findOneAndDelete({ _id: params.id})

        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },



};

// export module
module.exports = thoughtsController;
const {Thought, User} = require('../models');

module.exports = {

    getThoughts(req,res){
        Thought.find()
        .then((thought)=> res.json(thought))
        .catch((err) => res.status(500).json(err));

    },
    getSingleThought(req, res){
        Thought.findOne({_id:req.params.thoughtId})
        .then((thought) =>
        !thought
        ?res.status(404).json({message: "No thoughts with this ID"})
        :res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req,res){
        Thought.create(req.body)
        .then((thought) => {
         
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: thought} },
              { new: true }
              
            );
            
          })
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'Thought created, but found no user with that ID',
                })
              : res.json('Created the thought 🎉')
          )
    },
    updateThought(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
            )
            .then((thought) => 
            !thought   
            ? res.status(404).json({message: "No thoughts with this ID"})
            : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thoughts with this id!" })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },


}
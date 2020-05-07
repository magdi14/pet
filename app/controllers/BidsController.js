const Bid = require("../../database/models/Bid");

module.exports = {
  index: (req, res) => {
    Bid.find({}, function(error, Bids) {
      if (error) {
        res.status(204).send({ message: "Something Went Wrong!" });
      } else {
        res.status(200).send({ message: "All Bids: ", Bids });
      }
    }).populate('user_id').populate('pet_id');
  },
  show: (req, res) => {
    const id = req.params.id;
    Bid.find({ _id: id }, function(error, Bid) {
      if (error || Bid == null) {
        res.status(204).send({ message: "Something went wrong!" });
      } else {
        res.status(200).send({ Bid });
      }
    }).populate('user_id').populate('pet_id');
  },
  store: (req, res) => {
    const bid = new Bid({
      amount_of_money: req.body.amount_of_money,
      user_id: req.body.user_id,
      pet_id: req.body.pet_id
    });
    bid.save(function(error, bid) {
      if (error) {
        res.status(503).send({ message: "somthing went wrong!", error });
      } else {
        res.status(201).send({ message: "Bid created successfully!", bid });
      }
    });
  }
};
/*
    e.g:
        module.exports = {
            index : (req, res) => {
                - You can various of functions in mongoose to get all record in collection check docs.
                - Then Send the response with appropriate status providing message for explanation and of course data needed.
            },
            show: (req, res) => {
                - First access the parameter provided in the url like so: 
                    const id = req.params.{query_passed_in_url}
                - Use the find operation in mongoose passing id as variable to get data associated with from db.
                - The send the response with status, message and data needed.
            },
            store: (req, res) => {
                - First you need to create a new object from your model.
                - Then access the request body and take the data provided.
                - Then save it in your collection in db.
                - Then send the response
            },
            edit: (req, res) => {
                - Access the query provided in url to get the desired record to edit it like we did in show fn.
                - Use updateOne fn provided from mongoose to edit the record with the new data.
                - Send the response with status, message for clarifying the status and the record updated. 
            },
            delete: (req, res) => {
                - Access the query provided in url to get the record from the collection to delete it like we did in update and show fns.
                - Use deleteOne fn from mongoose to delete the record.
                - Send a ressponse with status and message clarifying it.
            }

        }
- The name of every function in module.exports is the name used when specifying the function used in this endpoint in the routes file.

*/

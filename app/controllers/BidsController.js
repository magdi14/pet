const Bid = require("../../database/models/Bid");

function auctions() {
  const bids = [500, 500, 500, 500];
  const names = [
    "John Doe",
    "John Smith",
    "Sara Conor",
    "Martin Fowler",
  ];
  var items = 3;
  var tie = 0;
  var n = bids.length;
  let all = [];
  for (i = 0; i < n; i++) {
    var obj = {};
    obj["name"] = names[i];
    obj["bid"] = bids[i];
    all.push(obj);
  }
  // console.log(names[0].localeCompare(names[5]))
  for (i = 0; i < n-1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (all[j]["bid"] < all[j + 1]["bid"]) {
        let tmp = all[j];
        all[j] = all[j + 1];
        all[j + 1] = tmp;
      } else if (all[j]["bid"] === all[j + 1]["bid"]) {
        tie+=2;
        if (all[j]["name"].localeCompare(all[j + 1]["name"]) === 1) {
          let tmp = all[j];
          all[j] = all[j + 1];
          all[j + 1] = tmp;
        }
      }
    }
  }
  for (i = 0; i < n; i++) {
    console.log(all[i]["name"] + ": " + all[i]["bid"]);
  }
  if(tie)
  {
    console.log("No Winners")
    console.log(tie)
  } else{
    for(i=0; i<n; i++){
      if(items !== 0){
        console.log(all[i]["name"] + ": " + all[i+1]["bid"]);
        --items;
      }else{
        console.log(all[i]["name"] + ": " + "LOST");
      }
    }
  }
  // console.log(tie);
}
module.exports = {
  index: (req, res) => {
    Bid.find({}, function (error, Bids) {
      if (error) {
        res.status(204).send({ message: "Something Went Wrong!" });
      } else {
        res.status(200).send({ message: "All Bids: ", Bids });
      }
    })
      .populate("user_id")
      .populate("pet_id");
  },
  show: (req, res) => {
    const id = req.params.id;
    Bid.find({ _id: id }, function (error, Bid) {
      if (error || Bid == null) {
        res.status(204).send({ message: "Something went wrong!" });
      } else {
        res.status(200).send({ Bid });
      }
    })
      .populate("user_id")
      .populate("pet_id");
  },
  store: (req, res) => {
    const bid = new Bid({
      amount_of_money: req.body.amount_of_money,
      user_id: req.body.user_id,
      pet_id: req.body.pet_id,
    });
    bid.save(function (error, bid) {
      if (error) {
        res.status(503).send({ message: "somthing went wrong!", error });
      } else {
        res.status(201).send({ message: "Bid created successfully!", bid });
      }
    });
  },
  auctionsCalc: (req, res) => {
    auctions();
  },
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

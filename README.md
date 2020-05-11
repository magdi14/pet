# Pet Store

- First of all the working port on localhost is 3000 so its gives me `localhost:3000/`
## Endpoints
- Here's the two endpoints added:
  * Challenge #1
    * `/bids`
      - Method: GET
      - Description: List all bids created by users to store owner.
      - Operation: index
      - Response: 
        - 200: 
          - Description: JSON Array with all bids
        - 204:
          - Description: "Something went wrong!"
    * `/bids/add`
      - Method: POST
      - Description: User can add new bid on a pet
      - Operation: store
      - Produces:
        - application/json
      - Parameters:
        - amount_of_money `must be written in the same format`
          - in: body
          - type: Number
          - format: double
          - required: true
        - user_id   `must be written in the same format`
          - in: body
          - type: String
          - format: ObjectId
          - required: true
        - pet_id `must be written in the same format`
          - in: body
          - type: String
          - format: ObjectId
          - required: true
       - Response:
        - 201: 
          - Description: "Bid created successfully!"
        - 503: 
          - Description: "Somthing Went Wrong!"
       - NOTE: form data from body MUST BE a `x-www-form-urlencoded`

   - Challenge #2
      - you can access the script by entering endpoint called:
        - `/auctions`
         - Method: GET
         - Description: List all bids created by users to store owner.
         - Operation: auctionsCalc
         - Response: 
            - Prints in the console the results of bids for a given `bids` array and `name` array accordingly the [Generalized second-price auction](https://en.wikipedia.org/wiki/Generalized_second-price_auction) mechanism.

## Models
  - Bid
    - type: object
    - properties:
        * _id: 
          * type: String
          * format: ObjectId
        * mount_of_money: 
          * type: number
          * format: double
        * user_id:
          * type: String
          * format: ObjectId
          * ref: "User"
        * pet_id: 
          * type: String
          * format: ObjectId
          * ref: "Pet"
   - Pet
      - type: object
      - properties:
        * _id: 
          * type: String
          * format: ObjectId
        * name: 
          * type: String
   - User
      - type: object
      - properties:
        * _id: 
          * type: String
          * format: ObjectId
        * name: 
          * type: String

## Tools
* [express](https://expressjs.com/) `pkg`
* [mongoose](https://mongoosejs.com/) `pkg` 
* [body-parser](https://www.npmjs.com/package/body-parser) `pkg

### Prerequisites
* First of all you'll need [node.js](https://nodejs.org/en/download/) installed and running on your machine.
* Also [MongoDB](https://www.mongodb.com/download-center/community) with its default installation.

      
    

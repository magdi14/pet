const express = require("express");
const router = express.Router();
const permissionsCtrl = require("../app/controllers/PermissionsController");
const rolesCtrl = require("../app/controllers/RolesController");
const bidsCtrl = require("../app/controllers/BidsController");
const usersCtrl = require("../app/controllers/UsersController");
const petsCtrl = require("../app/controllers/PetsController");


//Bids
router.route("/bids").get(bidsCtrl.index);
router.route("/bids").post(bidsCtrl.store);
router.route("/bids/:id").get(bidsCtrl.show);

//Users
router.route("/users").get(usersCtrl.index);
router.route("/users").post(usersCtrl.store);
router.route("/users/:id").get(usersCtrl.show);

//Pets
router.route("/pets").get(petsCtrl.index);
router.route("/pets").post(petsCtrl.store);
router.route("/pets/:id").get(petsCtrl.show);

//Permissions
router.route("/permissions").get(permissionsCtrl.index);
router.route("/permissions/:id").get(permissionsCtrl.show);
router.route("/permissions").post(permissionsCtrl.store);
router.route("/permissions/:id").delete(permissionsCtrl.destroy);

//Roles
router.route("/roles").get(rolesCtrl.index);
router.route("/roles").post(rolesCtrl.store);
router.route("/roles/:id").get(rolesCtrl.show);
router.route("/roles/:id").delete(rolesCtrl.destroy);
router.route("/roles/:id").put(rolesCtrl.update);
/*
const userCtrl = require('../app/controller/UsersController');

Then here add your endpoints for the user controller like

//Users
router.route('users').get(userCtrl.index)  here index is a fn to get all users from db implemented in users controller.
router.route('users/:id').get(userCtrl.show)  here show is a fn to get a user from db implemented in users controller with specific id represented in the url as shown.

PS: you can accsess the id provided in url via request by params attribute.
*/

/* 
After adding all your routes you must to export the router variable
*/
module.exports = router;

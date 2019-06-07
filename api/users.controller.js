const User = require("../models/user.model");
import CacheService from "../services/cache.service";

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new CacheService(ttl); // Create a new cache service instance

// Create and Save a new User
exports.create = (req, res) => {
  console.log("Create Request::");
  // Validate request
  if (!req.body.email) {
    return res.status(400).json({
      message: "User email can not be empty"
    });
  }

  // Create a User
  const user = new User({
    name: req.body.name || "Anonymous User",
    email: req.body.email
  });

  // Save User in the database
  user
    .save(user)
    .then((data) => {
      console.log("User Created::");
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
  // Call the db function inside cache handler
  cache
    .get("all", () =>
      User.find().then((users) => {
        return users;
      })
    )
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
  cache
    .get(req.params.userId, () =>
      User.findById(req.params.userId).then((user) => {
        return user;
      })
    )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.json(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error retrieving User with id " + req.params.userId
      });
    });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.email) {
    return res.status(400).send({
      message: "User email can not be empty"
    });
  }

  // Find User and update it with the request body
  User.findByIdAndUpdate(
    req.params.userId,
    {
      name: req.body.name || "Anonymous User",
      email: req.body.email
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found with id " + req.params.userId
        });
      }
      res.json({
        message: "User updated successfully!"
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).json({
        message: "Error updating User with id " + req.params.UserId
      });
    });
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  cache
    .del(req.params.userId, () =>
      User.findByIdAndRemove(req.params.userId).then((user) => {
        return user;
      })
    )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.UserId
        });
      }
      res.json({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.UserId
        });
      }
      return res.status(500).send({
        message: "Could not delete User with id " + req.params.UserId
      });
    });
};

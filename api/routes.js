import users from "./users.controller";
import { isLoggedIn } from "../services/login.validator";

module.exports = (router) => {
  // Restrict route
  router.use("/admin", isLoggedIn);

  // Create a new user
  router.post("/users", isLoggedIn, users.create);

  // Retrieve all users
  router.get("/users", users.findAll);

  // Retrieve a single User with userId
  router.get("/users/:userId", users.findOne);

  // Update a User with userId
  router.put("/users/:userId", isLoggedIn, users.update);

  // Delete a User with userId
  router.delete("/users/:userId", isLoggedIn, users.delete);
};

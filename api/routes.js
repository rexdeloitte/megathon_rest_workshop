module.exports = (router) => {
  const users = require("./users.controller");

  // Create a new user
  router.post("/users", users.create);

  // Retrieve all users
  router.get("/users", users.findAll);

  // Retrieve a single User with userId
  router.get("/users/:userId", users.findOne);

  // Update a User with userId
  router.put("/users/:userId", users.update);

  // Delete a User with userId
  router.delete("/users/:userId", users.delete);
};

// router.get('/:id', async (req, res, next) => {
//   try {
//     const db = req.router.locals.db;
//     const user = await db.collection('user').findOne({ _id: new ObjectID(req.params.id) }, {
//       email: 1,
//       firstName: 1,
//       lastName: 1
//     });

//     if (user) {
//       user.id = req.params.id;
//       res.send(user);
//     } else {
//       res.sendStatus(404);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// router.post('/', async (req, res, next) => {
//     try {
//       const db = req.router.locals.db;
//       const user = await db.collection('user').findOne({ _id: new ObjectID(req.params.id) }, {
//         email: 1,
//         firstName: 1,
//         lastName: 1
//       });

//       if (user) {
//         user.id = req.params.id;
//         res.send(user);
//       } else {
//         res.sendStatus(404);
//       }
//     } catch (err) {
//       next(err);
//     }
//   });
// export default router;
// module.exports = router;

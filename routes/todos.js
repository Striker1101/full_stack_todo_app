const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

//get all the todos data
router.get("/", todoController.getAll);

//get specific data
router.get("/:id", todoController.show);

//create new todo
router.post("/", todoController.store);

// update a specific todo
router.put("/:id", todoController.update);

//delete a specific todo
router.delete("/:id", todoController.delete);

module.exports = router;

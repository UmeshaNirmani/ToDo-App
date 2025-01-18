const express = require("express");
const ToDoModel = require("../models/todo");
const ToDoRouter = express.Router();
// const verifyToken = require("../auth/tokenverify");
// const jwt = require("jsonwebtoken");

// test the todo route
ToDoRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello todos!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create a todo
ToDoRouter.post("/create", async (req, res) => {
  // console.log("req create: ", req.body);
  // const userData = jwt.verify(
  //   req.token,
  //   process.env.ACCESS_TOKEN_SECRET,
  //   (err, authData) => {
  //     if (err) {
  //       console.log(err);
  //       return err;
  //     } else return authData;
  //   }
  // );
  const ToDo = new ToDoModel({
    // UserId: userData.UserId,
    ToDoId: req.body.ToDoId,
    Title: req.body.Title,
    Description: req.body.Description,
    Status: req.body.Status,
  });
  try {
    console.log("ToDo: ", ToDo);
    const newRecord = await ToDo.save();
    res.status(200).json({
      status: "success",
      message: "Created a new ToDo!",
      data: newRecord,
    });
  } catch (error) {
    console.error("Catch error: ", error);
    res.status(400).json({
      status: "error",
      message: "Error saving",
      data: [],
    });
  }
});

// fetch all todos
ToDoRouter.post("/fetchall", async (req, res) => {
  // console.log("todos", res.data);
  // const userData = jwt.verify(
  //   req.token,
  //   process.env.ACCESS_TOKEN_SECRET,
  //   (err, authData) => {
  //     if (err) {
  //       console.log(err);
  //       return err;
  //     } else  console.log("authData", authData); return authData;
  //   }
   
  // );
  try {
    // let ToDo = await ToDo.find({ UserId: userData.UserId });
    let ToDo = await ToDoModel.find({});
    res.status(200).json({
      status: "success",
      message: "Record found",
      data: ToDo,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error finding",
      data: [],
    });
  }
});

// View a todo
ToDoRouter.post("/fetchone", async (req, res) => {
  try {
    let ToDo = await ToDoModel.find({ ToDoId: req.body.ToDoId });
    res.status(200).json({
      status: "success",
      message: "Record found",
      data: ToDo,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error finding",
      data: [],
    });
  }
});

// Update a todo
ToDoRouter.post("/update", async (req, res) => {
  try {
    const ToDoUpdate = {
      Title: req.body.Title,
      Description: req.body.Description,
      Status: req.body.Status,
    };
    let UpdateResult = await ToDoModel.findByIdAndUpdate(
      req.body._id,
      ToDoUpdate,
      { new: true });  
    console.log("UpdateResult", UpdateResult);
    const updatedRecord = await UpdateResult.save();
    res.status(200).json({
      status: "success",
      message: "Updated the ToDo!",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Catch error: ", error);
    res.status(400).json({
      status: "error",
      message: "Error saving",
      data: [],
    });
  }
 });

// Delete a todo
ToDoRouter.post("/delete", async (req, res) => {
  try {
    let ToDoDelete = await ToDoModel.deleteOne({ ToDoId: req.body.ToDoId });
    res.status(200).json({
      Status: "success",
      message: "Record deleted!",
      data: ToDoDelete,
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error deleting",
      data: [],
    });
  }
}) 

module.exports = ToDoRouter;

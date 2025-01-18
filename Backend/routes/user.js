const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/user");
// const jwt = require("jsonwebtoken");
// const verifyToken = require("../auth/tokenverify");

// for testing the route
userRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello user!", data: "hello user!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// register a user
userRouter.post("/register", async (req, res) => {
  console.log("inputs signup", req.body);

  const user = new userModel({
    Name: req.body.Name,
    Email: req.body.Email,
    Password: req.body.Password,
  });
  try {
    const newUser = await user.save();
    res.status(200).json({
      status: "success",
      message: "User Created!",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// login a user
userRouter.post("/login", async (req, res) => {
  console.log("inputs login", req.body);

  try {
    const userAuth = await userModel.findOne({
      Email: req.body.Email,
      Password: req.body.Password
    });
    if (!userAuth) {
      return res.status(400).json({
        status: "error",
        message: "User not found!",
        data: null,
      });
    }

    // const accessToken = jwt.sign(
    //   {
    //     UserId: userAuth._id,
    //     Email: userAuth.Email,
    //     FirstName: userAuth.FirstName,
    //     Role: userAuth.Role,
    //   },
    //   process.env.ACCESS_TOKEN_SECRET
    // );
    const responseData = {
      Name: userAuth.Name,
      Email: userAuth.Email,
      Password: userAuth.Password,
      // accessToken: accessToken,
    };

    if (userAuth.Password === responseData.Password) {
      res.status(200).json({
        status: "success",
        message: "User Found!",
        data: responseData,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "Incorrect password!",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Authentication error",
      data: error.message,
    });
  }
});

// userRouter.post("/todo", async (req, res) => {
  //console.log("token", req.token);
  // const userData = jwt.verify(
  //   req.token,
  //   process.env.ACCESS_TOKEN_SECRET,
  //   (err, authData) => {
  //     if (err) {
  //       console.log("err",err);
  //       return err;
  //     } else  return authData; //console.log("authData", authData);
  //   }
  // );

//   try {
//     let userProfile = await userModel.findById(userData.UserId);   
//     res.status(200).json({
//       status: "success",
//       message: "User found!",
//       data: userProfile,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       message: "Error finding",
//       data: [],
//     });
//   }
// });


// userRouter.post("/fetch", async (req, res) => {
//   try {
//     const tableData = await userModel.find({});
//     console.log("tableData", tableData);
//     res.status(200).json({
//       status: "success",
//       message: "Found Records",
//       data: tableData,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


module.exports = userRouter;
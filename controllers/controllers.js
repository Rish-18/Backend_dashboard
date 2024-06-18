const express = require("express");
const app = express();
const usermodel = require("../models/userschema");
const mongoose = require("mongoose");

const allusers = (req, res) => {
  usermodel
    .find()
    .then((mongoData) => res.json(mongoData))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const searchusers = (req, res) => {
  usermodel
    .findById(req.params.id)
    .then((mongoData) => res.json(mongoData))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const deleteusers = (req, res) => {
  usermodel
    .deleteOne({ _id: req.params.id })
    .then(() => res.json({ success: true, message: "Data Deleted" })
    )
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const updateusers = (req, res) => {
  const { name, category, rating , downloads } = req.body;
  usermodel
    .updateOne({ _id: req.params.id }, { $set: { name, category, rating , downloads } })
    .then(() =>
      res.json({ success: true, message: "Data Updated Successfully" })
    )
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const addusers = (req, res) => {
  const {  name, category, rating , downloads} = req.body;
  const newuser = new usermodel({
    _id: new mongoose.Types.ObjectId(),
    name,
    category,
    rating,
    downloads
  });
  newuser
    .save()
    .then(() => res.json({ success: true, message: "Data added" }))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

const abs = async (req, res) => {
  try {
    const games = await usermodel.find();
    res.render("dashboard2", { games });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  allusers,
  searchusers,
  deleteusers,
  updateusers,
  addusers,
  abs,

};

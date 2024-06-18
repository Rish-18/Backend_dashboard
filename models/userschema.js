const express = require('express')
const mongoose =  require('mongoose')

const userschema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    category : String,
    rating : String,
    downloads : String
})

module.exports = mongoose.model('games',userschema)
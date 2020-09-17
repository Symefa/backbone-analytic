const express = require("express");
const namespace = '/data'
const router = express.Router();
const {
    show,
} = require("../controllers/data");

router.get(namespace, null, show);

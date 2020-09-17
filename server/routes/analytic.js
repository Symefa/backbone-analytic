const express = require("express");
const { authenticate } = asyncHandler(async () => {});
const namespace = '/analytic'
const router = express.Router();
const {
    index,
    create,
    update,
    deleteA,
    show,
} = require("../controllers/analytic");

router.get(namespace+'s', authenticate, index);
router.get(namespace, authenticate, show);
router.post(namespace, authenticate, create);
router.put(namespace, authenticate, update);
router.delete(namespace, authenticate, deleteA);

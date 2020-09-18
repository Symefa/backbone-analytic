const express = require("express");
const namespace = '/analytic'
const router = express.Router();
const {
    index,
    create,
    update,
    deleteA,
    show,
} = require("../controllers/analytic");

router.get(namespace + 's', index);
router.get(namespace, show);
router.post(namespace, create);
router.put(namespace, update);
router.delete(namespace, deleteA);

module.exports = router;

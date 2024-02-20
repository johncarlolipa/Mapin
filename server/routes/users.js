const router = require("express").Router();
const User = require("../models/User");

// register

router.post("/register", async (req, res) => {
    try {

    } catch (error){
        res.status(500).json(error)
    }
})



module.exports = router;

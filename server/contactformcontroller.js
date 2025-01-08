const express = require("express");
const router = express.Router();

router.post("/api/contactformcontroller", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    res.send({ acknowledged: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An error occurred" });
  }
});

module.exports = router;

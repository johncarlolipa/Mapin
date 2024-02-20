const router = require("express").Router();
const Pin = require("../models/Pin");

// Create pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get single pin by ID
router.get("/:id", async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }
    res.status(200).json(pin);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update pin by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPin = await Pin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPin) {
      return res.status(404).json({ message: "Pin not found" });
    }
    res.status(200).json(updatedPin);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete pin by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPin = await Pin.findByIdAndDelete(req.params.id);
    if (!deletedPin) {
      return res.status(404).json({ message: "Pin not found" });
    }
    res.status(200).json({ message: "Pin deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

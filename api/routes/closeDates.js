const CloseDate = require("../models/CloseDate");
const router = require("express").Router();

// work in progress

//create a category

router.post("/add", async (req, res) => {
  const newCloseDate = new CloseDate({
    year: req.body.year,
    openDate: req.body.openDate,
    closeCommentDate: req.body.closeCommentDate,
    closePostDate: req.body.closePostDate,
  });
  try {
    const savedCloseDate = await newCloseDate.save();
    res.status(200).json(savedCloseDate);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a category

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (req.body.role === "admin") {
      await category.updateOne({ $set: req.body });
      res.status(200).json("The category has been updated");
    } else {
      res.status(403).json("You don't have permission to this operation");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a category

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params._id);
    if (req.body.role === "admin") {
      await category.deleteOne();
      res.status(200).json("The category has been deleted");
    } else {
      res.status(403).json("You don't have permission to delete categories");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a category

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get  all closeDates

router.get("/allCloseDates", async (req, res) => {
  try {
    const filter = {};
    const closeDates = await CloseDate.find(filter);
    res.status(200).json(closeDates);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

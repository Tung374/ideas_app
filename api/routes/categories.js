const router = require("express").Router();
const Category = require("../models/Category");

// work in progress

//create a category

router.post("/add", async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    desc: req.body.desc,
  });
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
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

//get  all categories

router.get("/allCategories", async (req, res) => {
  try {
    const filter = {};
    const categories = await Category.find(filter);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

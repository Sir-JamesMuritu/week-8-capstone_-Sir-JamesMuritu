const Category = require("../models/categoryModel.js");
const asyncHandler = require("express-async-handler");

// @desc    Create new category
// @route   POST /api/v1/category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        message: `Category '${existingCategory.name}' already exists`,
      });
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc    Update category
// @route   PUT /api/v1/category/:categoryId
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc    Delete a category
// @route   DELETE /api/v1/category/:categoryId
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted",
      category: {
        id: category._id,
        name: category.name,
      },
    });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc    Get all categories
// @route   GET /api/v1/category/categories
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.status(200).json(all);
  } catch (error) {
    console.error("List Categories Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc    Get a single category by ID
// @route   GET /api/v1/category/:id
const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Read Category Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
};

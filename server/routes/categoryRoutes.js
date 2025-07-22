const express = require("express");
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

const {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
} = require("../controllers/categoryController.js");

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, deleteCategory);
router.route("/categories").get(getAllCategories);
router.route("/:id").get(getCategoryById);
module.exports = router;

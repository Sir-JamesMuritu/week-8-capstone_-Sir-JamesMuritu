const express = require("express");
const router = express.Router();
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware.js");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} = require("../controllers/orderController.js");
router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

router.route("/mine").get(authenticate, getMyOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authenticate, findOrderById);
router.route("/:id/pay").put(authenticate, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, markOrderAsDelivered);
router.route("/:id/original").get(authenticate, getOrderById);
router.route("/:id/original/pay").put(authenticate, updateOrderToPaid);
router.route("/:id/original/deliver").put(authenticate, authorizeAdmin, updateOrderToDelivered);
module.exports = router;

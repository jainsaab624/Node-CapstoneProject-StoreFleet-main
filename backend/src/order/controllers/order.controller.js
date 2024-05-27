// Please don't change the pre-written code
// Import the necessary modules here

import {
  createNewOrderRepo,
  SingleOrderRepo,
  getUserOrderRepo,
  allPlacedOrdersRepo,
  updateOrderStatusRepo
} from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try {
    const newOrder = await createNewOrderRepo({
      ...req.body,
      paidAt: new Date(),
      user: req.user._id,
    });
    return res.status(201).json({
      success: true,
      newOrder,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const getSingleOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await SingleOrderRepo(orderId);
    if (!order || order.length === 0) {
      return next(new ErrorHandler(400, "order not found!"));
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const getUserOrder = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const order = await getUserOrderRepo(userId);
    if (!order || order.length === 0) {
      return next(new ErrorHandler(400, "order not found!"));
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const allPlacedOrders = async (req, res, next) => {
  try {
    const orders = await allPlacedOrdersRepo();

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found.",
        orders: [], // Return an empty array
      });
    }

    // Return the orders
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const orderStatus = req.body.orderStatus;

    const orders = await updateOrderStatusRepo(orderId,orderStatus)

    if (!orders || orders.length === 0) {
      return next(new ErrorHandler(400, "order not found! with status shipped"));
    }

    // Return the orders
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

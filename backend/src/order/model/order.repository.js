import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  // Write your code here for placing a new order
  const newOrder = new OrderModel(data);
  await newOrder.save();
  return newOrder;
};

export const SingleOrderRepo = async (orderId) => {
  const order = await OrderModel.findById(orderId);
  return order;
};

export const getUserOrderRepo = async (userId) => {
  const order = await OrderModel.find({ user: userId });
  return order;
};

export const allPlacedOrdersRepo = async () => {
  const order = await OrderModel.find({ orderStatus: "Processing" });
  return order;
};

export const updateOrderStatusRepo = async (orderId, orderStatus) => {
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    {
      orderStatus: orderStatus,
    },
    {
      new: true,
    }
  );

  await order.save();

  return order;
};

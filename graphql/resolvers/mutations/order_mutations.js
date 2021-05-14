const { Order } = require("../../../models");
const { Service } = require("../../../models");
const { ApolloError } = require("apollo-server-express");

const { transformOrder } = require("../transform");

const orderMutations = {
  orderService: async (parent, args, context, info) => {
    const { isAuth, userId } = context;
    const { notes } = args;
    if (!isAuth) {
      throw new ApolloError("Unauthenticated!");
    }
    const fethcService = await Service.findOne({ _id: args.serviceId });
    const order = new Order({
      user: userId,
      notes: notes,
      service: fethcService,
    });

    const result = await order.save();
    const transform = transformOrder(result);
    return transform;
  },
  cancelOrder: async (parent, args, context, info) => {
    const { isAuth } = context;
    if (!isAuth) {
      throw new ApolloError("Unauthenticated!");
    }
    try {
      const order = await Order.findById(args.orderId).populate("service");
      const service = transformService(order.service);
      await Order.deleteOne({ _id: args.orderId });
      return service;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { orderMutations };

const { ApolloError } = require("apollo-server-errors");
const { Service } = require("../../../models");
const { transformService } = require("../transform");

const serviceQueries = {
  services: async (parent, args, context, info) => {
    try {
      const services = await Service.find();
      return services.map((service) => {
        return transformService(service);
      });
    } catch (err) {
      throw new ApolloError(err);
    }
  },
  getServicesByCategory: async (parent, args, context, info) => {
    try {
      const { categoryId } = args;
      const services = await Service.find({ category: { _id: categoryId } });
      return services.map((service) => {
        return transformService(service);
      });
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  getService: async (parent, args, context, info) => {
    try {
      const service = await Service.findOne({ _id: args.serviceId });
      return transformService(service);
    } catch (err) {
      throw new ApolloError(err);
    }
  },
};

module.exports = { serviceQueries };

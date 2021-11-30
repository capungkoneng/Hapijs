"use strict";

const { Model } = require("objection");

class Customer extends Model {
  static get tableName() {
    return "customers";
  }

  static relationMappings() {
    const Contact = require("./ConModel");
    return {
      contact: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contact,
        join: {
          from: "customer_id",
          through: {
            from: "customer_id",
            to: "contact_id",
          },
          to: "contact_id",
        },
      },
    };
  }
}

module.exports = Customer;

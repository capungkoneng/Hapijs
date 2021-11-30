"use strict";

const { Model } = require("objection");


class Contact extends Model {
  static get tableName() {
    return "contacts";
  }

  static relationsMappings() {
    const Customer = require("./CusModel");
   return{
        customers: {
      relation: Model.BelongsToOneRelation,
      modelClass: Customer,

      join: {
        from: "contact_id",
        through: {
          from: "contact_id",
          to: "customer_id",
        },
        to: "customer_id",
      },
    },
  };
}
}

module.exports = Contact;

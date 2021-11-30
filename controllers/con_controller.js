const knex = require("../knex");
const { Model } = require("objection");
const Contact = require("../models/ConModel");
const Joi = require("joi");

Model.knex(knex);

exports.ContactList = async function (request, h) {
  const page = request.params.page - 1;
  try {
    const contacts = await Contact.query()
      .select("contact_id", "customer_id", "contact_name", "phone", "email")
      .withGraphFetched('customers')
      .page(page, 5);
    if (contacts) {
      return contacts;
    } else {
      return h.response({ message: "Error Product Not Found" }).code(404);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.ContactDetail = async function (request, h) {
  const id = request.params.id;
  try {
    const contacts = await Contact.query()
      .findById(id)
      .withGraphFetched("customers");
    if (contacts) {
      return contacts;
    } else {
      return h.response({ message: "Error Product Not Found" }).code(404);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.ContactStore = async function (request, h) {
  const contact_name = request.payload.contact_name;
  const phone = request.payload.phone;
  const email = request.payload.email;
  const customer_id = request.payload.customer_id;

  const schema = Joi.object({
    contact_name: Joi.string().alphanum().min(3).max(32).required,
    phone: Joi.number().required,
    email: Joi.string().min(12).max(255).required,
    customer_id: Joi.required,
  });
  try {
    const validate_schema = schema.validate({
      contact_name: contact_name,
      phone: phone,
      email: email,
      customer_id: customer_id,
    });

    const contacts = await Contact.query().insertAndFetch({
      contact_name: contact_name,
      phone: phone,
      email: email,
      customer_id: customer_id,
    });

    if (contacts) {
      return h.response({
        contacts,
        message: "Insert Product Successfully ",
        status: "ok",
      });
    } else {
      return h.response({ message: "Error Store Product" }).code(400);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.ContactInsert = async function (request, h) {
  const contact_name = request.payload.contact_name;
  const phone = request.payload.phone;
  const email = request.payload.email;
  const customer_id = request.payload.customer_id;
  try {
    const contacts = await Contact.query().insertGraph(
      [
        {
          contact_name: contact_name,
          phone: phone,
          email: email,
          customer_id: customer_id,

          customers: [
            {
              id: customer_id,
            },
          ],
        },
      ],
      {
        relate: true,
      }
    );
    if (contacts) {
      return h.response({
        message: "Insert Product Successfully ",
        status: "ok",
        contacts,
      });
    } else {
      return h.response({ message: "Error Slur" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.ContactUpdate = async function (request, h) {
  const contact_id = request.params.contact_id;
  const contact_name = request.payload.contact_name;
  const phone = request.payload.phone;
  const email = request.payload.email;
  const customer_id = request.payload.customer_id;
  const contacts = await Contact.query()
    .findById(contact_id)
    .updateAndFetchById(contact_id, {
      contact_name: contact_name,
      phone: phone,
      email: email,
      customer_id: customer_id,
    });
  if (contacts) {
    return h.response({
      contacts,
      message: "Update Product Successfully ",
      status: "ok",
    });
  } else {
    return h.response({ message: "Error Store Product" }).code(400);
  }
};

exports.ContactDelete = async function (request, h) {
  const contact_id = request.params.contact_id;
  const contacts = await Contact.query().deleteById(contact_id);
  if (contacts) {
    return h.response({ message: "Deleted Successfully" });
  } else {
    return h.response({ message: "Error Delete Category" });
  }
};

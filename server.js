"use  strict";

const hapi = require("@hapi/hapi");
const TaskController = require("../hapibackend/controllers/todo_controller");
const ConController = require("../hapibackend/controllers/con_controller");
const Joi = require("joi");

const server = hapi.Server({
  port: 8081,
  host: "localhost",
});

const start = async () => {
  await server.start();
  console.log("Server berjalan di %s", server.info.uri);
};

server.route([
  {
    method: "GET",
    path: "/todo",
    handler: TaskController.taskList,
  },
  {
    method: "POST",
    path: "/todo",
    handler: TaskController.taskCreate,
  },
  {
    method: "PUT",
    path: "/todo/{id}",
    handler: TaskController.taskUpdate,
  },
  {
    method: "DELETE",
    path: "/todo/{id}",
    handler: TaskController.taskDelete,
  },

  //contak route
  {
    method: "GET",
    path: "/contact",
    handler: ConController.ContactList,
  },
  {
    method: "POST",
    path: "/contact",
    handler: ConController.ContactInsert,
  },
  {
    method: "GET",
    path: "/contact/{id}",
    handler: ConController.ContactDetail,
  },
  {
    method: "GET",
    path: "/contact/page={page}",
    handler: ConController.ContactList,
  },
  {
    method: "PUT",
    path: "/contact/{id}",
    handler: ConController.ContactUpdate,
  },
  {
    method: "DELETE",
    path: "/contact/{id}",
    handler: ConController.ContactDelete,
  },
]);

start();

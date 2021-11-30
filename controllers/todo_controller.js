"use  strict";
const knex = require("../knex");
const { Model } = require("objection");
const { Todo } = require("../models/TodoModels");

Model.knex(knex);

exports.taskList = async function (request, h) {
  const todo = await Todo.query();
  try {
    return todo;
  } catch (err) {
    console.log(err);
  }
};

exports.taksDetail = async function (request, h) {
  const id = request.params.id;
  const todo = await Todo.query().findById(id);
  try {
    return todo;
  } catch (err) {
    console.log(err);
  }
};

exports.taskCreate = async function (request, h) {
  const name = request.payload.name;
  const status = request.payload.status;
  const todo = await Todo.query().insert({
    name: name,
    status: status,
  });
  try {
    return todo;
  } catch (err) {
    console.log(err);
  }
};

exports.taskUpdate = async function (request, h) {
  const id = request.params.id;
  const name = request.payload.name;
  const status = request.payload.status;
  const todo = await Todo.query().findById(id).patch({
    name: name,
    status: status,
  });
  try {
    return todo;
  } catch (err) {
    console.log(err);
  }
};

exports.taskDelete = async function(request, h) {
	const id = request.params.id;
	const todo = await Todo.query().deleteById(id);
	try{
		return todo
	}catch{
		return console.log(err)
	}
}
exports.taskDelete = function (request, h) {
  const id = request.params.id;
  return knex("todo").where("id", id).del();
};

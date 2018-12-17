/**
 * there was an error in calling the super function in multilevel 
 * inheritance. The bug has been fixed and shown to work with
 * this example.
 *  */

var juof = require('../..');

function Response(req, res) {
    this.req = req;
    this.res = res;
}

var Controller = juof.inherit(function Controller(route, req, res) {
    this.super(req, res);
    this.route = route;
}, Response);

var UserController = juof.inherit(function UserController(route, req, res) {
    this.super(route, req, res);
}, Controller);

var instance = new UserController("route", "req", "res");
console.log(instance);
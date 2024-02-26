"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv = require("dotenv");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var approuter_js_1 = require("./approuter.js");
dotenv.config();
if (!process.env.PORT) {
    console.log("no port value specified...");
    process.exit(1);
}
var PORT = parseInt(process.env.PORT, 10);
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, cors_1["default"])());
app.use((0, helmet_1["default"])());
app.use("/", approuter_js_1.approuter);
app.listen(PORT, function () {
    console.log("server running on port ".concat(PORT));
});

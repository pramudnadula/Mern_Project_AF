const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

function Createserver() {
    const app = express();
    app.use(cors());
    app.use(bodyparser.json());

    return app;

}
module.exports = Createserver;
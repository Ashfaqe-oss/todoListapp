//jshint esversion6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const items = ["Get your Best FOOD", "Live to Code", "Love SMART work"];
let workItems = [];

app.get("/", function(req, res) {

    let day = date.getDate();

    res.render("list", {
        ListTitle: day,
        newListItems: items
    });
    console.log(items);
});

app.post("/", function(req, res) {
    let item = req.body.newItem;

    if (req.body.list === "work-list") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

    res.redirect("/");
});


app.get("/work", function(req, res) {

    res.render("list", {
        ListTitle: "work-list",
        newListItems: workItems
    });
});

app.post("/", function(req, res) {
    let item = req.body.newitem;
    workItems.push(item);

    res.redirect("/work");
});

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.listen(process.env.PORT, function(req, res) {
    console.log("server is up and running on port 7000");
});
var express = require("express");
var mongoose = require("mongoose");
var User = require("./User");

var app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mongodbsample");

let db = mongoose.connection;
db.on("error", (error) => {
    console.log("Connection Error" + error)
})

db.on("open", () => {
    console.log("Db Connection Success");
})

app.get("/", (req, res) => {
    res.end("Welcome to Mongoose");
});

app.post("/save", (req, res) => {
    let body = req.body;
    let user = new User(
        {
            name: body.name,
            email: body.email
        }
    );
    user.save().then(result => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
    });
});

app.get("/list", (req, res) => {
    User.find().then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
    });
});

app.get("/get/:id", (req, res) => {
    User.findById(req.params.id).then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
    }
    )
});

app.put("/update/:id", (req, res) => {
    let body = req.body
    User.findByIdAndUpdate(req.params.id, { name: body.name, email: body.email }).then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
    });
})

app.delete("/delete/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id).then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
    });
})

app.listen(8082, () => {
    console.log("API's running on http://localhost:8082/")
})
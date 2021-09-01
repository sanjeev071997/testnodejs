const express = require('express');
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const signUp = require("./models/signUp");
const { create } = require('hbs');
const port = process.env.PORT || 8080;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.use('/src', express.static('src'));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.get("/", (req, res) => {
    res.render("home");
})
app.post("/", async (req, res) => {
    try {
        const Password = req.body.Password;
        const ConfirmPassword = req.body.ConfirmPassword;
        if (Password === ConfirmPassword) {
            const signForm = new signUp({
                Name: req.body.Name,
                Email: req.body.Email,
                Password: req.body.Password,
                ConfirmPassword: req.body.ConfirmPassword,
            })
            const signup = await signForm.save()
            res.status(201).render("home");
        }else {
            res.send("Is already exists");
        }
    } catch (error) {
        res.status(400).json({error : 'Is already exists'});
    }
})
app.get("/about.hbs", (req, res) => {
    res.render("about");
})
app.get("/post.hbs", (req, res) => {
    res.render("post");
})
app.get("/blog.hbs", (req, res) => {
    res.render("blog");
})
app.get("/404.hbs", (req, res) => {
    res.render("404.hbs");
})
app.post("/post.hbs", async (req, res) => {
    try {
        const Email = req.body.Email;
        const Password = req.body.Password;
        const userEmail = await signUp.findOne({ Email: Email });
        if(userEmail.Password === Password) {
            res.status(201).render("post");
        }else {
            res.send("invalid email or password");
        };
    } catch (error) {
        res.status(400).send("invalid email or password");
    }
});
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});
const express = require("express")
const app = express();
const pug = require("pug")
const mongoose = require("mongoose")
const path = require("path")
const { param } = require("express/lib/request");
const fs = require("fs");
const Register = require("./db/loginschema");
const bookings =require("./db/bookSchema");
const logins = require("./db/loginschema");
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
require("./db/connect")
const port = process.env.PORT || 3000;

//EXPRESS REALTED STUFFS
app.use("/static", express.static("static"))

//PUG REALTED STUFFS
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

//ENDPOINTS
app.get("/", (req, res) => {
    res.status(200).render("index");
})
app.get("/loginpage", (req, res) => {
    res.status(200).render("loginpage");
})
app.get("/Eloginpage", (req, res) => {
    res.status(200).render("Eloginpage");
})
app.get("/doctor", (req, res) => {
    res.render("doctor");
})
app.get("/signup", (req, res) => {
    res.render("appoints");
})
app.get("/meal2", (req, res) => {
    res.render("meal2");
})
app.get("/meal3", (req, res) => {
    res.render("meal3");
})
app.get("/meal4", (req, res) => {
    res.render("meal4");
})

//POST REQUEST FOR SIGNUP FORM IN booking
app.post("/booking", async (req, res) => {
    try {
        const newBook=new bookings({
            name:req.body.name,
            Sid:req.body.Sid,
            email:req.body.email,
            date:req.body.date,
            course:req.body.course,
            plans:req.body.plans,
            password:req.body.password
        })
        const contact_regitered = await newBook.save();
        res.status(201).render("index");
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})



//POST REQUEST FOR login FORM IN EMPLOYEE login PAGE
app.post("/elogin", async (req, res) => {
    try {
           const email=req.body.email;
           const password=req.body.password;

           const usermail= await logins.findOne({email:email});
           
           if(usermail.password == password){
            res.status(201).redirect("/allBooking");
                   }
           else{
            res.send("invalid login")
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})


//get all route
app.get('/allBooking', async (req, res) => {
    try {
       const Book = await bookings.find()
       res.render('list', {x: Book})
    } catch (error) {
       res.status(404).send(error)
    }
 })
 
 
// to get profile of single student
app.get('/student/:id', async (req, res) => {
    try {
       const learner = await bookings.findById(req.params.id);
       res.render('profile', { x: learner});
    } catch (error) {
        console.log(error);
       res.send(error);
    }
 })
 
// to delete a record from the student list
 app.get('/x/student/:id', async (req, res) => {
    try {
        const removed = await bookings.findById(req.params.id)
        await removed.deleteOne();
        res.redirect("/allBooking");
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})

 //login for customer
 app.post("/clogin", async (req, res) => {
    try {
           const email=req.body.email;
           const password=req.body.password;

           const usermail= await bookings.findOne({email:email});
        //    const user= await Booking.find({"email":{email}});
           
           if(usermail.password == password){
            res.status(201).render("sprofile",{x:usermail});
                   }
           else{
            res.send("invalid login")
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})


//START THE SERVER
app.listen(port, () => {
    console.log(`server runnig at ${port}`)
})

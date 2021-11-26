const express = require('express');
const app = express();
const mongoose = require('mongoose')
// require('dotenv').config()


const bodyParser = require('body-parser');
const PASSWORD = process.env.MONGO_PASSWORD;
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(
  "mongodb+srv://t1user:cxTLuvWjmnXn3LSR@mdbu.bpuao.mongodb.net/overseas_talkshow1",
//  "mongodb://localhost:27017/formm",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
// data schema 
const notesSchema = {
    name: {type: String, required: true},
    age: {type: Number, required: true},
    school: {type: String, required: true},
    phone: {type: String, required: true},
    linkfb: {type: String, required: true},


}
const Note = mongoose.model("Note", notesSchema)
app.get("https://overseasform.netlify.app",function(req, res) {

     res.sendFile(__dirname + "/index.html")
})
app.get("https://overseasform.netlify.app/success", function(req, res) {
    res.send("success")
})
app.get('/index.css', function(req, res) {
    res.sendFile(__dirname + "/" + "index.css");
  });
app.post("https://overseasform.netlify.app/", function(req, res){
        let newNote = new Note({
            name: req.body.name,
            age: req.body.age,
            school: req.body.school,
            phone: req.body.phone,
            linkfb: req.body.linkfb,
        })
        newNote.save();
        res.redirect("/")
    
})
app.listen(3000, function(){
    console.log("server is running on 3000")
})
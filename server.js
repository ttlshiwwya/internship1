const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Mobiles = require('./models/Mobiles');  

const app = express();  

app.use(bodyParser.json());   


mongoose.connect(
    'mongodb://localhost:27017/store', 
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => 
    console.log("Connection to MongoDB is Successful")
).catch((err) => 
    console.error("MongoDB connection error:", err)
);


app.get('/', (req, res) => {
    res.send('Mobile Store API is up and running');
});


app.listen(3000, () => 
    console.log('Server is UP & running on PORT 3000')
);


app.post('/mobiles', async (req, res) => {
    try {
        const mobile = new Mobiles(req.body);
        await mobile.save();
        res.status(201).send(mobile);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.get('/mobiles', async (req, res) => {
    try {
        const mobiles = await Mobiles.find();
        res.send(mobiles);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.get('/mobiles/:id', async (req, res) => {
    try {
        const mobile = await Mobiles.findById(req.params.id);
        if (!mobile) {
            return res.status(404).send("Mobile not found");
        }
        res.send(mobile);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.put('/mobiles/:id', async (req, res) => {
    try {
        const mobile = await Mobiles.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!mobile) {
            return res.status(404).send("Mobile not found");
        }
        res.send(mobile);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.delete('/mobiles/:id', async (req, res) => {
    try {
        const mobile = await Mobiles.findByIdAndDelete(req.params.id);
        if (!mobile) {
            return res.status(404).send("Mobile not found");
        }
        res.send(mobile);
    } catch (err) {
        res.status(500).send(err);
    }
});

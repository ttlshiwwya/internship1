const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Mobiles = require('./models/Mobiles');  // changed from Cars to Mobiles

const app = express();  // APP MEANS SERVER APPLICATION

app.use(bodyParser.json());   // Middleware

// connect to MongoDB
mongoose.connect(
    'mongodb://localhost:27017/store', // connection string
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => 
    console.log("Connection to MongoDB is Successful")
).catch((err) => 
    console.error("MongoDB connection error:", err)
);

// wild route
app.get('/', (req, res) => {
    res.send('Mobile Store API is up and running');
});

// Server listens on port 3000
app.listen(3000, () => 
    console.log('Server is UP & running on PORT 3000')
);

// Create a Mobile - insert a new mobile
app.post('/mobiles', async (req, res) => {
    try {
        const mobile = new Mobiles(req.body);
        await mobile.save();
        res.status(201).send(mobile);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Retrieve all mobiles
app.get('/mobiles', async (req, res) => {
    try {
        const mobiles = await Mobiles.find();
        res.send(mobiles);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get mobile by ID
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

// Update mobile by ID
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

// Delete mobile by ID
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

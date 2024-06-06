const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bmi_cal', {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
const PORT = 5000;
app.listen(PORT, () => {    
    console.log('Server is running on port:', PORT);
    });
app.get('/', (req, res) => {
    res.send('Hello World');
    });

// app.get('/bmi_cal', (req, res) => {
//     x=5+2;
//     return res.json({bmi: x});
//     });

const bmiSchema = new mongoose.Schema({
    weight: Number,
    height: Number,
    bmi: Number
    });
const BMI = mongoose.model('BMI', bmiSchema);
app.post('/bmi_cal', async (req, res) => {
    const { weight, height } = req.body;
    const bmi = weight / (height * height);
    const newBMI = new BMI({ weight, height, bmi });
    await newBMI.save();
    res.json(newBMI);
    });

app.get('/bmi_cal', async (req, res) => {
    const bmi = await BMI.find();
    res.json(bmi);
    });

const express = require('express');
const mongoose = require('mongoose');
const Slang = require('./models/slangSchema');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://juann:juandeag@juann.c3dfb6y.mongodb.net/slangdatabase?retryWrites=true&w=majority&appName=juann')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', async(req, res) => {
    res.sendFile('index.html');
})

// Get all slangs
app.get('/slangs', async (req, res) => {
    try {
        const slangs = await Slang.find();
        res.json(slangs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single slang by ID
app.get('/slangs/:id', async (req, res) => {
    try {
        const slang = await Slang.findById(req.params.id);
        if (slang == null) {
            return res.status(404).json({ message: 'Slang not found' });
        }
        res.json(slang);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/slang-search', async (req, res) => {
    const searchValue = req.query.search;

    try {
        let slangs;
        if (searchValue) {
            // If there is a search value, find slangs that match the search
            slangs = await Slang.find({
                word: { $regex: searchValue, $options: 'i' }  // Case-insensitive search for word
            });
        } else {
            // If no search value provided, return all slangs
            slangs = await Slang.find();
        }
        
        res.json(slangs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Create a new slang
app.post('/slangs', async (req, res) => {
    const slang = new Slang({
        word: req.body.word,
        meaning: req.body.meaning
    });

    try {
        const newSlang = await slang.save();
        res.status(201).json(newSlang);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a slang
app.put('/slangs/:id', async (req, res) => {
    try {
        const slang = await Slang.findById(req.params.id);
        if (slang == null) {
            return res.status(404).json({ message: 'Slang not found' });
        }
        
        slang.word = req.body.word;
        slang.meaning = req.body.meaning;

        const updatedSlang = await slang.save();
        res.json(updatedSlang);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/slangs', async (req, res) => {
    try {
        const slang = await Slang.deleteMany();
        res.json({ message: 'Every slang deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/slangs/:id', async (req, res) => {
    try {
        const slang = await Slang.findById(req.params.id);
        if (slang == null) {
            return res.status(404).json({ message: 'Slang not found' });
        }
        await Slang.findByIdAndDelete(req.params.id);
        res.json({ message: 'Slang deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = app;

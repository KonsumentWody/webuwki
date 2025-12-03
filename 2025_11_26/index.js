const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const uri = "mongodb+srv://wojkostrzewski_db_user:ADMIN@test.o9pnbas.mongodb.net/?appName=test";
const client = new MongoClient(uri);
let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('test');
        console.log('Connected to MongoDB (test)');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}
connectDB();

app.use((req, res, next) => {
    req.logDB = db;
    next();
});


app.use(async (req, res, next) => {
    try {
        await req.logDB.collection('accessLogs').insertOne({
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            timestamp: new Date()
        });
    } catch (err) {
        console.error('Error saving access log:', err);
    }
    next();
});


app.use('/categories', require('./routes/categories'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));

// errory
app.use((err, req, res, next) => {
    (async () => {
        try {
            await req.logDB.collection('errorLogs').insertOne({
                message: err.message,
                stack: err.stack,
                method: req.method,
                url: req.originalUrl,
                timestamp: new Date()
            });
        } catch (dbErr) {
            console.error('Error logging error:', dbErr);
        }

        res.status(500).json({ error: 'Internal Server Error' });
    })();
});



app.listen(3000, () => {
    console.log('App is running on http://localhost:3000');
});

const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
const todoRoutes = require('./routes/todoRoutes'); 
const userRoutes = require('./routes/userRoutes'); 

const app = express(); 
const port = 8080; 

app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json()); 

mongoose.connect(`${process.env.MONGO_DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority',
  }
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

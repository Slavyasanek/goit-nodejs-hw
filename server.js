const app = require('./app')
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.set('strictQuery', true);

mongoose.connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful")
    })
  })
  .catch(e => {
    console.log(e);
    process.exit(1)
  })

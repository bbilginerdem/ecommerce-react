import mongoose from 'mongoose';

// connect to database 
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB: Connected'))
  .catch((err) => console.log(err.message));

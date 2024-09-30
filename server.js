const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const cors = require('cors')
const compression = require('compression')

// Routes








const User=require('./routes/authuser');


const Vole=require('./routes/vole');
const VoleMain=require('./routes/voleMain');











// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());


app.use(cors())
app.options('*', cors())

 //tcomperi les fichiers
app.use(compression())


//tkhademlek file hetha 
app.use('/voles', express.static(path.join(__dirname, 'uploads/voles')));




if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}












     



 




app.get('/api/s', (req,res)=>{
  console.log(2);
  res.send("dzdzdz")
}
);


// Mount Routes
app.use('/api/Vole', Vole);
app.use('/api/VoleMain', VoleMain);



app.use('/api/user', User);























app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
// Handle rejection outside express
// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
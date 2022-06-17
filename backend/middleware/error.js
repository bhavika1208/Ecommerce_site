const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

// Wrong Mongodb Id error
if (err.name === "CastError") {
  const message = `Resource not found. Invalid: ${err.path}`;
  err = new ErrorHandler(message,400 );
}

// Duplicate key error in mongoose
if(err.code === 11000){
  const message = `Duplicate ${Object.keys(err.keyValue)} enetered`;
  err = new ErrorHandler(message,400);
}

// Wrong JWT token in rest password
if(err.name === "JsonWebTokenError"){
  const message = `Json Web Token is invalid. Try again!`;
  err = new ErrorHandler(message,400); 
}


// JWT EXPIRE ERROR
if(err.name === "TokenExpireError"){
  const message = `Json Web Token is expired. Try again!`;
  err = new ErrorHandler(message,400); 
}

  res.status(err.statusCode).json({
      success:false,
      message:err.message
  });
}; 
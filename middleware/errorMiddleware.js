const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 5000;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}

module.exports = errorHandler;

// const errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode !== 200 ? res.statusCode : 500; // If statusCode is not set, default to 500
//     res.status(statusCode); // Add a semicolon here
//     res.json({
//         message: err.message,
//         stack: process.env.NODE_ENV === 'development' ? err.stack : null
//     });
// };

// module.exports = errorHandler;

// const errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode !== 200 ? res.statusCode : 500; // If statusCode is not set, default to 500
//     res.status(statusCode).json({
//         message: err.message,
//         stack: process.env.NODE_ENV === 'development' ? err.stack : null
//     });
// };

// module.exports = errorHandler;


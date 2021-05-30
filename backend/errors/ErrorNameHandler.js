// const NotFoundError = require('./NotFoundError');
// const CastError = require('./CastError');
// const ForbiddenError = require('./ForbiddenError');
// const ValidationError = require('./UnauthorizedError');
// const UnauthorizedError = require('./UnauthorizedError');

// function ErrorNameHandler(err, res) {
//   const { statusCode = 500, message } = err;

//   switch (err.name) {
//     case 'CastError':
//       return res
//         .status(statusCode)
//         .send({
//           message,
//         });

//     case 'DocumentNotFoundError':
//       return res
//         .status(statusCode)
//         .send({
//           message,
//         });
//     case 'ValidationError':
//       return res
//         .status(statusCode)
//         .send({
//           message,
//         });
//     case 'UnauthorizedError':
//       return res
//         .status(statusCode)
//         .send({
//           message,
//         });
//     case 'Forbidden':
//     default:
//       return res
//         .status(500)
//         .send({ message: 'An error occurred on the server' });
//   }
// }

const ApiError = require('./api-error');

console.log('handler');
function apiErrorHandler(err, req, res) {
  /* in prod, don't user console.log or console.err because
  it is not async
  */
  // console.error(err);
  // console.log('handler');

  if (err instanceof ApiError) {
    console.log('has');
    res.status(400).json({ message: 'err.message' });
    return;
  }
  res.status(500).json('Internal server error');
  // next();
}

module.exports = apiErrorHandler;

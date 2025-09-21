export default (err, req, res, next) => {
  res.status(500).json({ err: `❌ Error - ${err.message}` });
  next();
}
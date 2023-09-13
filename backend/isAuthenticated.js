function isAuthenticated(req, res, next) {
  if (req.session?.user) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}  

module.exports = isAuthenticated;
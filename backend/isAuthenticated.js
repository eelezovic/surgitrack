function isAuthenticated(req, res, next) {
  if (req.session?.user) { // I have added && req.session.user.role === "ADMIN" to check if the user is "ADMIN".
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}  

module.exports = isAuthenticated;
currentUserHandler = (req, res) => {
  const currentlyLoggedinUser = req.session.user;

  if (!currentlyLoggedinUser) {
    res.json(null); 
  } else {
    res.json({
      username: currentlyLoggedinUser.username,
      id: currentlyLoggedinUser.id,
      role: currentlyLoggedinUser.role
    });
  }
};


module.exports = currentUserHandler;
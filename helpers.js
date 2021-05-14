const userIDEmail = function(email, users) {
  for (let id in users) {
    if (users[id].email === email) {
      console.log(users[id]);
      return users[id];
    }
  }
  return undefined;
};

module.exports = { userIDEmail };
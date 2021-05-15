const { assert } = require('chai');

const { getUserByEmail } = require('../helpers.js');

const users = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "$2b$10$rvHo2hYewT/xCwPsuA4/5.difT3mwhJLc42BgjnqxIwfxs6fXJpoe" //Encrypted password of '1234'
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "$2b$10$ocTTDUb4Pn17fNRpEbSAC.J2RywHA1AA9bTSSfrZJ/60ww1WeHmNq" //password 'hello'
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", users)
    const expectedOutput = {
        id: "userRandomID", 
        email: "user@example.com", 
        password: "$2b$10$rvHo2hYewT/xCwPsuA4/5.difT3mwhJLc42BgjnqxIwfxs6fXJpoe"
    }
    assert.deepEqual(expectedOutput, user);
  });

  it('should return {} with an invalid email', function() {
    const user = getUserByEmail("user@google.com", users)
    const expectedOutput = undefined;
    assert.deepEqual(expectedOutput, user);
  });
});
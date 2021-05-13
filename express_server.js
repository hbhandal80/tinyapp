const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: users[req.cookies["userID"]],
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: users[req.cookies["userID"]],
  };
  res.render("urls_new", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

// Display the urls_show page
app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];

  const templateVars = { 
    shortURL: shortURL, 
    longURL: longURL,
    user: users[req.cookies["userID"]],
  };
  res.render("urls_show", templateVars);
});

app.post("/urls/:id", (req, res) => {
  const shortURL = req.params.id;
  const longURL = req.body.longURL;

  urlDatabase[shortURL] = longURL;
  res.redirect("/urls");
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
});

app.post("/urls", (req, res) => {
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL; 
  res.redirect(`/urls/${shortURL}`);  
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  res.cookie("userID", userID);
  res.redirect('/urls');
});

app.post("/logout", (req, res) => {
  res.clearCookie("userID");
  res.redirect('/urls');
});

//Registration page
app.get("/register", (req, res) => {
  const templateVars = { 
    user: users[req.cookies["userID"]],
  };
  res.render("urls_registeration", templateVars);
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).send("Please enter a valid email and password");
  } else if (userExists(email)) {
    res.status(400).send("This email already exists");
  } else {  
  const userID = generateRandomString();
  users[userID] = {
    id: userID,
    email: req.body.email, 
    password: req.body.password,
  };
  console.log(users);
  res.cookie("userID", userID);
  res.redirect("/urls");  
}
});

function userExists(email) {
  for (user in users) {
    if (users[user].email === email) {
      return true;
    }
  }
  return false;
}

function generateRandomString() {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let randomstring = '';
  for (let i = 0; i < 6; i++) {
   randomstring += (chars[Math.floor(Math.random() * chars.length)]);
  }
  return randomstring;
}
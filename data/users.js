const bcrypt = require("bcryptjs");
const users = [
  {
    name: "Admin User",
    email: "admin@exaample.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "john",
    email: "john@exaample.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "jane",
    email: "jane@exaample.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;

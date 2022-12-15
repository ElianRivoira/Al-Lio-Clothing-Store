const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  setAdminis,
  setUserr
} = require("../controllers/users");

router.post("/register", createUser);

router.post("/login", loginUser);

router.put("/admin/:id", setAdminis);

router.put("/user/:id", setUserr);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/", getUsers)

router.get("/:id", getSingleUser);

module.exports = router;

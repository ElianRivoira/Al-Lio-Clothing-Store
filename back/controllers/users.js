const {
  add,
  login,
  findAll,
  findOne,
  update,
  destroy,
  setAdmin,
  setUser
} = require("../services/users-services");

const regexEmail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const regexPassword = /^[a-zA-Z0-9 !@#$%^&*()-_=+.,']{6,32}$/;
const regexName = /^[a-zA-Z0-9 ]+$/;
const regexAddress = /^[a-zA-Z0-9 ]+$/;
const regexId = /^[0-9]+$/;

const createUser = async (req, res, next) => {
  const { name, address, email, password } = req.body;

  if (!regexName.test(name)) {
    res.status(400).send("Invalid characters in the name");
    return;
  }
  if (!regexAddress.test(address)) {
    res.status(400).send("Invalid characters in the address");
    return;
  }
  if (!regexEmail.test(email)) {
    res.status(400).send("It's not an email");
    return;
  }
  if (!regexPassword.test(password)) {
    res.status(400).send("Invalid characters or length in the password");
    return;
  }
  try {
    const user = await add(req.body);
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!regexEmail.test(email)) {
    res.status(400).send("It's not an email");
    return;
  }
  if (!regexPassword.test(password)) {
    res.status(400).send("Invalid characters or length in the password");
    return;
  }

  try {
    const response = await login(email, password);
    typeof response === "object"
      ? res.send(response)
      : res.sendStatus(response);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await findAll();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getSingleUser = async (req, res, next) => {
  const id = req.params.id;
  console.log(typeof id);

  if (!regexId.test(Number(id))) {
    res.status(400).send("You must be pass a valid integer as id");
    return;
  }
  try {
    const user = await findOne(id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, address, email, password } = req.body;
  const id = req.params.id;

  if (name) {
    if (!regexName.test(name)) {
      res.status(400).send("Invalid characters in the name");
      return;
    }
  }
  if (address) {
    if (!regexAddress.test(address)) {
      res.status(400).send("Invalid characters in the address");
      return;
    }
  }
  if (email) {
    if (!regexEmail.test(email)) {
      res.status(400).send("It's not an email");
      return;
    }
  }
  if (password) {
    if (!regexPassword.test(password)) {
      res.status(400).send("Invalid characters or length in the password");
      return;
    }
  }
  if (id) {
    if (!regexId.test(id)) {
      res.status(400).send("You must be pass a valid integer as id");
      return;
    }
  }

  try {
    const user = await update(req.body, id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  if (!regexId.test(id)) {
    res.status(400).send("You must be pass a valid integer as id");
    return;
  }

  try {
    await destroy(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const setAdminis = async (req, res, next) => {
  const id = req.params.id;

  if (!regexId.test(id)) {
    res.status(400).send("You must be pass a valid integer as id");
    return;
  }

  try {
    const user = await setAdmin(id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const setUserr = async (req, res, next) => {
  const id = req.params.id;

  if (!regexId.test(id)) {
    res.status(400).send("You must be pass a valid integer as id");
    return;
  }

  try {
    const user = await setUser(id);
    res.send(user);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  setAdminis,
  setUserr
};

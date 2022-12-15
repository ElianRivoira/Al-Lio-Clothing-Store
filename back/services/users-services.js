const { User } = require("../models/index");

const add = async body => {
  const user = await User.create(body);
  return user;
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    console.log("USERR", user);
    if (!user) return 401;
    const isValid = await user.validatePassword(password);
    if (!isValid) return 401;
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      type: user.type,
    };
    return payload;
  } catch (err) {
    console.error(err.stack);
  }
};

const findAll = async () => {
  const users = await User.findAll();
  return users;
};

const findOne = async id => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const update = async (body, id) => {
  const [affectedRows, updated] = await User.update(body, {
    where: { id },
    returning: true,
  });
  return updated[0];
};

const destroy = async id => {
  await User.destroy({ where: { id } });
};

const setAdmin = async id => {
  const [affectedRows, updated] = await User.update({type:'admin'},{ where: { id }, returning:true });
  return updated[0];
};

const setUser = async id => {
  const [affectedRows, updated] = await User.update({type:'user'},{ where: { id }, returning:true });
  return updated[0];
};

module.exports = {
  add,
  login,
  findAll,
  findOne,
  update,
  destroy,
  setAdmin,
  setUser
};

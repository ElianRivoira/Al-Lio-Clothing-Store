const {
  add,
  findAll,
  filterProducts,
  findOne,
  destroy,
  update,
} = require("../services/products-services");

const regexText = /^[a-zA-Z ]+$/;
const regexSize = /^[a-zA-Z]{1,3}$/;
const regexId = /^[0-9]+$/;
const regexUrl = /^http[s]:\/\/[a-zA-Z0-9@%$?&_*#:/=.\-]+$/;

const getAllProducts = async (req, res, next) => {
  try {
    const products = await findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
};

const getProductsWithFilters = async (req, res, next) => {
  const { category, name } = req.params;
  console.log(name);
  if (name) {
    if (!regexText.test(name)) {
      res.status(400).send("Invalid characters in the name");
      return;
    } else {
      try {
        const products = await filterProducts({ name });
        res.send(products);
      } catch (err) {
        next(err);
      }
    }
  }

  if (category) {
    if (!regexText.test(category)) {
      res.status(400).send("Invalid characters in the category");
      return;
    } else {
      try {
        const products = await filterProducts({ category });
        res.send(products);
      } catch (err) {
        next(err);
      }
    }
  }
};

const getOneProduct = async (req, res, next) => {
  const id = req.params.id;

  if (!regexId.test(id)) {
    res.status(400).send("You must be pass a valid integer as id");
    return;
  }

  try {
    const product = await findOne(id);
    res.send(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  const { name, price, category, colour, size, stock, description, img } =
    req.body;

  if (name) {
    if (!regexText.test(name)) {
      res.status(400).send("Invalid characters in the name");
      return;
    }
  }
  if (category) {
    if (!regexText.test(category)) {
      res.status(400).send("Invalid characters in the category");
      return;
    }
  }
  if (description) {
    if (!regexText.test(description)) {
      res.status(400).send("Invalid characters in the description");
      return;
    }
  }
  if (size) {
    if (!regexSize.test(size)) {
      res.status(400).send("Invalid characters in the size");
      return;
    }
  }
  if (colour) {
    if (!regexText.test(colour)) {
      res.status(400).send("Invalid characters in the colour");
      return;
    }
  }
  if (price) {
    if (!regexId.test(price)) {
      res.status(400).send("Invalid characters in the price");
      return;
    }
  }
  if (stock) {
    if (!regexId.test(stock)) {
      res.status(400).send("Invalid characters in the stock");
      return;
    }
  }
  if (img) {
    img.forEach((imag) => {
      if (!regexUrl.test(imag)) {
        res.status(400).send("Img must be a valid URL");
        return;
      }
    });
  }

  try {
    const product = await add(req.body);
    res.send(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    if (!regexId.test(id)) {
      res.status(400).send("Invalid characters in the id");
      return;
    }
  }
  try {
    await destroy(id);
    res.sendStatus(202);
  } catch (err) {
    next(err);
  }
};

const editProduct = async (req, res, next) => {
  const { name, price, category, colour, size, stock, description, img } =
    req.body;
  const id = req.params.id;

  if (name) {
    if (!regexText.test(name)) {
      res.status(400).send("Invalid characters in the name");
      return;
    }
  }
  if (category) {
    if (!regexText.test(category)) {
      res.status(400).send("Invalid characters in the category");
      return;
    }
  }
  if (description) {
    if (!regexText.test(description)) {
      res.status(400).send("Invalid characters in the description");
      return;
    }
  }
  if (size) {
    if (!regexSize.test(size)) {
      res.status(400).send("Invalid characters in the size");
      return;
    }
  }
  if (colour) {
    if (!regexText.test(colour)) {
      res.status(400).send("Invalid characters in the colour");
      return;
    }
  }
  if (price) {
    if (!regexId.test(price)) {
      res.status(400).send("Invalid characters in the price");
      return;
    }
  }
  if (stock) {
    if (!regexId.test(stock)) {
      res.status(400).send("Invalid characters in the stock");
      return;
    }
  }
  if (img) {
    img.forEach((imag) => {
      if (!regexUrl.test(imag)) {
        res.status(400).send("Img must be a valid URL");
        return;
      }
    });
  }
  if (id) {
    if (!regexId.test(id)) {
      res.status(400).send("Invalid characters in the id");
      return;
    }
  }

  try {
    const product = await update(req.body, id);
    res.send(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductsWithFilters,
  getOneProduct,
  createProduct,
  deleteProduct,
  editProduct,
};

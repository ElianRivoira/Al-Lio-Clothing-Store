const { where } = require("sequelize");
const { Product, Reviews } = require("../models");

const allReviews = (req, res, next) => {
  Reviews.findAll({ where: { productId: req.params.productId } })
    .then(reviews => {
      res.status(200).send(reviews);
    })
    .catch(err => next(err));
};

const newReview = (req, res, next) => {
  
  Reviews.create(req.body)
    .then(products => res.status(201).send(products))
    .catch(err => next(err));
};

const ratingAverage = (req, res, next) => {
  Reviews.findAll({ where: { productId: req.params.productId } })
    .then(review => {
      let totalReviews = 1;
      let revi = 0;
      review.forEach((rev, i) => {
        totalReviews += i;
        revi += rev.dataValues.rating;
      });

      let promedio = revi / totalReviews;

      res.send({ promedio });
    })
    .catch(err => next(err));
};

module.exports = { allReviews, newReview, ratingAverage };

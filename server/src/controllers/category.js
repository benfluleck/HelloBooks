import models from '../models';
import paginationFunc from '../controllers/middleware/pagination';

const { Categories, Books } = models;

export default {
  /** @description creates a category
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} created category Name
   */
  addCategory(req, res) {
    const categoryName = req.body.categoryName;
    Categories.findOne({
      where: {
        categoryName
      }
    }).then((foundCategory) => {
      if (foundCategory) {
        if (foundCategory) {
          return res.status(409).send({ message: 'Category already exists' });
        }
      }
      Categories.create({
        categoryName
      })
        .then((category) => {
          res.status(201)
            .send({
              message: `Category added!, ${category.categoryName}`,
              category
            });
        });
    })
      .catch(error => res.status(500).send(error.message));
  },

  /** @description Edits a specified category
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    * @returns {object} edited category
    */
  editCategory(req, res) {
    const categoryId = parseInt(req.params.categoryId, 10);
    if (isNaN(categoryId)) {
      return res.status(400).send({
        message: 'Please enter a valid category Id'
      });
    }
    Categories.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404)
            .send({ message: 'Category does not exist in this Library' });
        }
        Categories.findOne({
          where: {
            categoryName: req.body.categoryName
          }
        }).then((foundCategory) => {
          if (foundCategory) {
            return res.status(409)
              .send({ message: 'This Category already exists' });
          }
          category.update({
            categoryName: req.body.categoryName
          })
            .then((updatedCategory) => {
              res.status(200)
                .send({
                  message: 'Category Modified!',
                  updatedCategory
                });
            });
        });
      })
      .catch(error => res.status(500).send(error.message));
  },

  /** @description Displays all categories in the app
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    * @returns {object} All Categories
    */
  listCategories(req, res) {
    return Categories
      .all({ order: [['categoryName', 'ASC']] })
      .then((categories) => {
        if (Object.keys(categories).length < 1) {
          return res.status(200)
            .send({ message: 'sorry there are no categories available' });
        }
        const allCategories = { sucess: 'true', categories };
        res.status(200).send(allCategories);
      })
      .catch(error => res.status(500).send(error.message));
  },

  displayBookwithCategories(req, res) {
    const categoryId = parseInt(req.params.categoryId, 10);
    if (isNaN(categoryId)) {
      return res.status(400).send({
        message: 'Please enter a valid category'
      });
    }
    Categories.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404)
            .send({ message: 'Category does not exist in this Library' });
        }
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 8;
        Books
          .findAndCountAll({
            where: {
              categoryId
            },
            include: [{
              model: Categories,
              as: 'category',
              attributes: ['categoryName'],
            }],
            order: [['title', 'ASC']],
            limit,
            offset
          })
          .then((books) => {
            if (books.rows.length < 1) {
              return res.status(200)
                .send({
                  message: 'Sorry there are no books in this category',
                  books: books.rows,
                  pagination: paginationFunc(offset, limit, books)
                });
            }
            const categoryBooks = {
              message: 'Success!',
              books: books.rows,
              pagination: paginationFunc(offset, limit, books)
            };
            res.status(200).send(categoryBooks);
          });
      })
      .catch(error => res.status(500).send(error));
  },
  /**
   * Route: DELETE: /category/:categoryId
   * @description Deletes a selected book
   * @param {object} req
   * @param {object} res
   * @returns {object} books
   * @memmberOf BookController
   */
  deleteCategory(req, res) {
    const categoryId = parseInt(req.params.categoryId, 10);
    if (isNaN(categoryId)) {
      return res.status(400).send({
        message: 'Please enter a valid CategoryId'
      });
    }
    Categories.findById(categoryId, {
      include: [{
        model: Books,
        as: 'books',
      }]
    })
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        if (category.books.length > 0) {
          return res.status(409).send({
            message: 'You cannot delete this Category as there are still books in it',
          });
        }
        category
          .destroy()
          .then(() => res.status(200)
            .send({ message: `Category ${category.categoryName}, has been deleted`, category }))
          .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error.message));
  }


};

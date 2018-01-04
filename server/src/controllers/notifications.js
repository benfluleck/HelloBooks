import models from '../models';
import getPagination from '../controllers/helpers/pagination';


const { Notifications, Books, User } = models;

export default {
  /**  @description displays admin notifications
     *
     * @param {object} req HTTP request object
     *
     * @param {object} res HTTP response object
     *
     * @returns {object} admin notififications
     */
  displayNotification(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 3;
    return Notifications
      .findAndCountAll({
        include: [{
          model: Books,
          as: 'book',
          attributes: ['title'],
          paranoid: false
        },
        {
          model: User,
          as: 'user',
          attributes: ['username'],
        }
        ],
        order: [['createdAt', 'DESC']],
        limit,
        offset
      })
      .then((notifications) => {
        const allNotifications = {
          notifications: notifications.rows,
          pagination: getPagination(offset, limit, notifications)
        };
        res.status(200).send(allNotifications);
      })
      .catch(error => res.status(500).send(error.message));
  },

};

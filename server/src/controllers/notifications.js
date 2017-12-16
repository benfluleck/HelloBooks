import models from '../models';


const { Notifications, Books, User } = models;

export default {
  /**  @description displays admin notifications
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @returns {object} admin notififications
     */
  displayNotification(req, res) {
    return Notifications
      .findAll({
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
      })
      .then((notifications) => {
        const allNotifications = { notifications };
        res.status(200).send(allNotifications);
      })
      .catch(error => res.status(500).send(error.message));
  },

};

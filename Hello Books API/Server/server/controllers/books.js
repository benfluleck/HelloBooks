const User = require('./user');



module.exports = {
    create(req, res) {
        if (User === null) {
            return res.json({ success: false, message: 'You need to be logged in.' });
        } else {
            return res.json({ success: true, message: 'Success' });
        }

    }
};
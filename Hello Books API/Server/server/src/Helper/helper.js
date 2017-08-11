import faker from 'faker';
import db from '../models';


const User = db.User;

const Helper = {

/**
 * Get user's profile'
 * @param {Object} data object containing user's details
 * @returns {Object} return user's data
 */
User.create({
 firstname: faker.name.firstName(),
 lastname: faker.name.lastName(),
 username: 'Benny',
 password: 'benny',
 password_confirmation: 'benny',
 email: faker.internet.email()
}).then((user) => {
 userId = user.id;
});

done();
}),

};



export default Helper;
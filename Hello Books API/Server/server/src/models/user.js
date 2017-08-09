import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,

        },
        firstname: {
            type: String,
            required: true,
            trim: true,
            validate: {
                isName: ['^[a-z]+$', 'i'],
                msg: 'Must be only letters',
            }
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            validate: {
                isName: ['^[a-z]+$', 'i'],
                msg: 'Must be only letters',
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            trim: true,
            validate: {
                isAlphaNumeric: true,
                msg: 'Only Alpha numeric characters please',
            },
            unique: {
                args: true,
                msg: 'email already exist'
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            trim: true,
            validate: {
                len: [5, 16]: true,
                msg: 'Length between 6 and 12 please',

            }
        },
        password_confirmation: {
            type: Sequelize.VIRTUAL,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            trim: true,
            validate: {
                isEmail: true,
                msg: 'Must be an Email address'
            },
            unique: {
                args: true,
                msg: 'email already exist'
            },
        },
        user_level: {
            type: DataTypes.ENUM,
            allowNull: false,
            default: 'Bronze',
            values: ['Gold', 'Silver', 'Bronze']
        },
        user_level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1,

        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

    }, {
        underscore: true
    });
    User.associate = (models) => {
        User.belongsToMany(models.Books, { as: 'userbooks', through: models.UserBooks, foreignKey: 'userid' });
    };

    User.prototype.generateHash = () => {

        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        return bcrypt.compareSync(password, this.password);
    };
    hooks: {
        beforeCreate: (user) => {
            user.generateHash();
        };
        beforeUpdate: (user) => {
            if (user._changed.password) {
                user.generateHash();
            }
        };
    }

    return User;
};
'use strict';

Object.defineProperty(exports, "__esModule", {
 value: true
});

var _toTitleCase = require('to-title-case');

var _toTitleCase2 = _interopRequireDefault(_toTitleCase);

var _sentenceCase = require('sentence-case');

var _sentenceCase2 = _interopRequireDefault(_sentenceCase);

var _uniqueRandom = require('unique-random');

var _uniqueRandom2 = _interopRequireDefault(_uniqueRandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function(sequelize, DataTypes) {
 var Books = sequelize.define('Books', {

  title: {
   type: DataTypes.STRING,
   allowNull: false,
   trim: true,
   unique: 'compositeIndex',
   validate: {
    is: {
     arg: /\w+/g,
     msg: 'Must be only letters'
    },
    len: {
     args: [2, 30],
     msg: 'Book Title must be at least 2 chars and less than 50 chars'
    }
   },
   set: function set(val) {
    this.setDataValue('title', (0, _toTitleCase2.default)(val));
   }
  },
  author: {
   type: DataTypes.STRING,
   allowNull: false,
   trim: true,
   unique: 'compositeIndex',
   validate: {
    is: {
     arg: /\w+/g,
     msg: 'Must be only letters'
    },
    len: {
     args: [2, 30],
     msg: 'Author\'s name must be at least 2 chars and less than 50 chars'
    }
   },
   set: function set(val) {
    if (val !== undefined) {
     this.setDataValue('author', (0, _toTitleCase2.default)(val));
    }
   }
  },
  category: {
   type: DataTypes.STRING,
   allowNull: false,
   trim: true,
   validate: {
    is: {
     arg: /\w+/g,
     msg: 'Must be only letters'
    },
    len: {
     args: [2, 30],
     msg: 'Category name must be at least 2 chars and less than 30 chars'
    }
   },
   set: function set(val) {
    if (val !== undefined) {
     this.setDataValue('category', (0, _toTitleCase2.default)(val));
    }
   }
  },
  description: {
   type: DataTypes.STRING,
   allowNull: true,
   trim: true,
   set: function set(val) {
    if (val !== undefined) {
     this.setDataValue('description', (0, _sentenceCase2.default)(val));
    }
   }
  },
  quantity: {
   type: DataTypes.INTEGER,
   allowNull: false,
   defaultValue: 1,
   validate: {
    isNumeric: {
     msg: 'Only numbers allowed'
    }
   }

  },

  book_image: {
   type: DataTypes.STRING,
   allowNull: true
  },

  status: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue: false
  }
 }, {
  freezeTableName: true
 });
 Books.associate = function(models) {
  Books.belongsToMany(models.User, {
   as: 'userbooks',
   through: models.UserBooks,
   foreignKey: 'bookid'
  });
 };

 return Books;
};
import React from 'react';
import { Modal, Row, Input, Icon, Button } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoriesOptionList from '../../../container/categories/CategoriesOptionsList.jsx';
import { bookDetailValidator } from '../../../../validators/validator';
import { updateBookDetails } from '../../../../actions/admin/books';

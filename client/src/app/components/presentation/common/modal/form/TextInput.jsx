import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Text input component
 * for forms
 * @param {Object} props - type,name,label,placeholder,prefix,value
 *
 * @return {Object} jsx - returns the Text Inpiut
 */
const TextInput = ({
  type, name, label, onChange,
  placeholder, prefix, value,
  errors, errorMsg, active, required
}) => (
  <div className="row">
    <div className="input-field col s12">
      { prefix && <i className="material-icons prefix">{prefix}</i> }
      { type === 'textarea' ?
        <textarea
          name={name}
          id="description"
          className={errors ?
            'materialize-textarea invalid' : 'materialize-textarea validate'}
          onChange={onChange}
          value={value}
          required={required}
        /> :
        <input
          type={type}
          name={name}
          className={errors ? 'invalid' : 'validate'}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
        />
      }
      <label
        htmlFor={name}
        className={active ? 'active' : ''}
        data-error={!errors ? errorMsg : errors}
      >{label}
      </label>
    </div>
  </div>
);
TextInput.defaultProps = {
  active: null,
  value: '',
  prefix: '',
  placeholder: '',
  errors: '',
  required: '',
  errorMsg: '',
  onChange: null
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  active: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.string,
  required: PropTypes.string,
  errorMsg: PropTypes.string
};

export default TextInput;

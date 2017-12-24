import React from 'react';
import { shallow } from 'enzyme';
import TextInput from
  '../../../../../src/app/components/presentation/common/modal/form/TextInput.jsx';

jest.mock('react-router-dom');

const props = {
  type: 'text',
  name: 'name',
  label: 'label',
  onChange: jest.fn(),
  placeholder: 'placeholder',
  prefix: 'prefix',
  value: 'value',
  error: 'error',
  errorMsg: 'errorMsg',
  active: false,
  required: 'required',
};

describe('Text Input', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<TextInput {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('textarea')).toHaveLength(0);
  });

  it('should render textarea when type is equal to text area', () => {
    const newProps = { ...props };
    newProps.type = 'textarea';
    const wrapper = shallow(<TextInput {...newProps} />);
    expect(wrapper.find('input')).toHaveLength(0);
    expect(wrapper.find('textarea')).toHaveLength(1);
  });

  it('should change className if error is not present', () => {
    const newProps = { ...props };
    newProps.error = null;
    const wrapper = shallow(<TextInput {...newProps} />);
    expect(wrapper.find('input').props().className).toBe('validate');
  });

  it('should not display error when error is null in text area', () => {
    const newProps = { ...props };
    newProps.type = 'textarea';
    newProps.error = null;
    const wrapper = shallow(<TextInput {...newProps} />);
    expect(wrapper
      .find('textarea')
      .props()
      .className)
      .toBe('materialize-textarea validate');
  });

  it('should show active in label when active is set to true', () => {
    const newProps = { ...props };
    newProps.active = true;
    newProps.error = null;
    const wrapper = shallow(<TextInput {...newProps} />);
    expect(wrapper.find('label').props().className).toBe('active');
  });
});

import React from "react";
import PropTypes from "prop-types";
// import classnames from "classnames";

const Input = ({
  label,
  name,
  placeholder,
  value,
  type,
  disabled,
  ref,
  defaultValue,
  onChange,
  error
}) => {
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <input
        placeholder={placeholder}
        className="form-control"
        type={type}
        name={name}
        disabled={disabled}
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  ref: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string
};

Input.defaultProps = {
  type: "text"
};

export default Input;

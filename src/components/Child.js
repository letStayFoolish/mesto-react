import React from 'react';

const Child = ({
  labelClassName,
  value,
  avatarRef,
  onChange,
  name,
  id,
  type,
  placeholder,
  className,
  minLength,
  maxLength,
}) => {
  return (
    <label className={labelClassName}>
      <input
        value={value}
        ref={avatarRef}
        onChange={onChange}
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        className={className}
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      {/* <span className='popup__input-error popup__input-error_type_image-name'> */}
      <span className='popup__input-error'>
        Необходимо заполнить данное поле
      </span>
    </label>
  );
};

export default Child;

import React from 'react';
import { forwardRef } from 'react';

const InputWithAvatar = forwardRef(function InputWithAvatar(props, ref) {
  const { labelClassName, name, id, type, placeholder, className } = props;
  return (
    <label className={labelClassName}>
      <input
        ref={ref}
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        className={className}
        required
      />
      {/* <span className='popup__input-error popup__input-error_type_image-name'> */}
      <span className='popup__input-error'>
        Необходимо заполнить данное поле
      </span>
    </label>
  );
});

export default InputWithAvatar;

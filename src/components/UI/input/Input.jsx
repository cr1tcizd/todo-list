import autosize from 'autosize';
import cl from './Input.module.css'
import React from 'react';

const Input = React.forwardRef((props, ref) => {
  autosize(document.querySelectorAll(`.${cl.input}`));
  autosize(document.querySelectorAll(`.${cl.input}`));
  return (
    <textarea ref={ref} {...props} className={cl.input} />
  );
})

export default Input;

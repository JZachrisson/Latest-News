import React from 'react';

const InputWithLabel = ({
  id,
  value,
  onInputChange,
  isFocused,
  type = 'text',
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        value={value}
        id="search"
        type="text"
        onChange={onInputChange}
        type={type}
      />
    </>
  );
};

export default InputWithLabel;

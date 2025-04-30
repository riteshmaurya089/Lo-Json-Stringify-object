import React, { useRef } from 'react';

const UncontrolledForm = () => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;

    if (value.trim() !== '') {
      alert(`Entered Text: ${value}`);
      inputRef.current.value = ''; // Clear input
    } else {
      alert('Please enter some text.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="textInput">Text:</label><br />
          <input type="text" id="textInput" ref={inputRef} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;

import React, { useState } from 'react';

const DynamicEmailForm = () => {
  const [emails, setEmails] = useState([{ id: Date.now(), value: '', error: '' }]);

  const handleChange = (index, newValue) => {
    const updatedEmails = [...emails];
    updatedEmails[index].value = newValue;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    updatedEmails[index].error = newValue && !emailRegex.test(newValue)
      ? 'Invalid email format'
      : '';

    setEmails(updatedEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, { id: Date.now(), value: '', error: '' }]);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Dynamic Email Form</h2>
      <form>
        {emails.map((email, index) => (
          <div key={email.id} style={{ marginBottom: '10px' }}>
            <input
              type="email"
              placeholder={`Email ${index + 1}`}
              value={email.value}
              onChange={(e) => handleChange(index, e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
            {email.error && <p style={{ color: 'red' }}>{email.error}</p>}
          </div>
        ))}
        <button type="button" onClick={handleAddEmail}>
          Add Email
        </button>
      </form>

      <h3>Entered Emails:</h3>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>{email.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicEmailForm;

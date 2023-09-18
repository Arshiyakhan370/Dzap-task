
import React, { useState } from 'react';

function DuplicateError() {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setError(null);
    setResult(null);
  };

  const onSubmit = () => {
    const lines = inputText.split('\n');
    const addressSet = new Set(); 
    const errors = [];
    const validAddresses = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(/[,=\s]+/);
      if (parts.length !== 2) {
        errors.push(`Line ${i + 1} has an incorrect format.`);
      } else {
        const [address, value] = parts;

        if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
          errors.push(`Line ${i + 1}: Invalid Ethereum address.`);
        }

        if (!/^\d+$/.test(value)) {
          errors.push(`Line ${i + 1}: Invalid amount. Amount should be a positive integer.`);
        }

        
        if (addressSet.has(address)) {
          errors.push(`Address ${address} encountered duplicates.`);
        } else {
          addressSet.add(address);
          validAddresses.push({ address, amount: parseInt(value) });
        }
      }
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
      setResult(null);
    } else {
     
      console.log('Input is valid.');
      console.log('Result:');
      console.log(validAddresses);

      setResult(validAddresses);
    }
  };

  return (
    <div className="container" style={{ width: '60vw' }}>
      <h4 className="mt-3" style={{ textAlign: 'left' }}>DuplicateError</h4>
      <div className="mb-3" style={{ textAlign: 'left', color: 'grey', fontSize: '0.8rem', fontWeight: '500' }}>
        <p> Addresses with Amounts </p>
        <textarea
          className="form-control"
          style={{ background: '#f5f5fa' }}
          rows="9"
          value={inputText}
          onChange={handleInputChange}
        />
        <p style={{ textAlign: 'left', color: 'grey', fontSize: '0.8rem', fontWeight: '500' }}>
          Separate by ',' or '' or '='
        </p>
      </div>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          <span className='me-3'><i className="fa fa-exclamation-circle" aria-hidden="true"></i></span>
          {error}
        </div>
      )}

      {result && (
        <div className="alert alert-success mt-3" role="alert">
          <span className='me-3'><i className="fa fa-check-circle" aria-hidden="true"></i></span>
          Input is valid. You can perform further actions here.
        </div>
      )}

      {result && (
        <div className="result mt-3">
          <h5>Result:</h5>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <button className="btn btn-primary mt-3 w-100" onClick={onSubmit}>
        Next
      </button>
    </div>
  );
}

export default DuplicateError;

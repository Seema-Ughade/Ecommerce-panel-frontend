import React, { useState } from 'react';

const TaxManagementForm = () => {
  const [taxInfo, setTaxInfo] = useState({
    country: 'Zimbabwe',
    countryTax: 36,
    allowStateTax: false,
    states: [
      { name: 'Virginia', taxRate: 4 },
      { name: 'Harare', taxRate: 0 },
    ],
  });

  // Handle input change for country tax and state tax
  const handleInputChange = (e, field, index = null) => {
    const { name, value, type, checked } = e.target;
    if (name === 'allowStateTax') {
      setTaxInfo({ ...taxInfo, [name]: checked });
    } else if (index !== null) {
      const updatedStates = [...taxInfo.states];
      updatedStates[index][name] = value;
      setTaxInfo({ ...taxInfo, states: updatedStates });
    } else {
      setTaxInfo({ ...taxInfo, [name]: value });
    }
  };

  const handleSubmit = () => {
    // Handle saving the data
    console.log('Tax Info Saved:', taxInfo);
  };

  return (
    <div className="tax-management-form">
      <h2>Tax Management</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label>Country: </label>
          <input
            type="text"
            name="country"
            value={taxInfo.country}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        
        <div>
          <label>Tax (%): </label>
          <input
            type="number"
            name="countryTax"
            value={taxInfo.countryTax}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="allowStateTax"
              checked={taxInfo.allowStateTax}
              onChange={(e) => handleInputChange(e)}
            />
            Allow State Tax
          </label>
        </div>

        {taxInfo.allowStateTax && (
          <div>
            <h3>State Tax Rates</h3>
            {taxInfo.states.map((state, index) => (
              <div key={index}>
                <label>{state.name} Tax (%): </label>
                <input
                  type="number"
                  name="taxRate"
                  value={state.taxRate}
                  onChange={(e) => handleInputChange(e, 'taxRate', index)}
                />
              </div>
            ))}
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TaxManagementForm;

// FilterForm.js
import React, { useState } from "react";

const FilterForm = ({ onFilterSubmit }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onFilterSubmit(filterValue);
  };

  return (
    <form onSubmit={handleFilterSubmit}>
      <label>
        Filter by Status:
        <select value={filterValue} onChange={handleFilterChange}>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="PENDING">Pending</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <button type="submit">Apply Filter</button>
    </form>
  );
};

export default FilterForm;

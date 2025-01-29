import React, { useState } from "react";
import Qubit from "../components/Qubit";
import Ecom from "../components/Ecom";
function General() {
  const [selectedOption, setSelectedOption] = useState("qubit");
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row rounded mx-0">
          <div className="col-md-6 p-3">
            <select id="componentSelector" className="form-select main-search" value={selectedOption} onChange={handleSelectChange}>
              <option value="qubit">Qubit</option>
              <option value="qubit_ecom">Ecom</option>
            </select>
          </div>
        </div>
      </div>
      {selectedOption === "qubit" && <Qubit />}
      {selectedOption === "qubit_ecom" && <Ecom />}
    </>
  );
}
export default General;
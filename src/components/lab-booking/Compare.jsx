import React from "react";
import "../../css/compare.css";

export default function Compare({ compareList, labs, onRemove, onChoose }) {
  if (!compareList.length)
    return <div className="cmp-empty">No tests selected for comparison.</div>;

  return (
    <div className="cmp-container">
      <h2 className="cmp-title">Compare Tests</h2>
      <table className="cmp-table">
        <thead>
          <tr>
            <th>Test</th>
            {labs.map((lab) => (
              <th key={lab.id}>{lab.name}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {compareList.map((test) => (
            <tr key={test.id}>
              <td>{test.name}</td>
              {labs.map((lab) => {
                const t = lab.tests.find((x) => x.id === test.id);
                return <td key={lab.id}>₹{t?.price}</td>;
              })}
              <td>
                <button
                  className="cmp-btn cmp-low"
                  onClick={() => onChoose(test, "low")}
                >
                  Choose Low
                </button>
                <button
                  className="cmp-btn cmp-high"
                  onClick={() => onChoose(test, "high")}
                >
                  Choose High
                </button>
                <button
                  className="cmp-btn cmp-remove"
                  onClick={() => onRemove(test.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useState } from "react";

export default function Search() {
  const [isAdvanced, setIsAdvanced] = useState(false);
  return (
    <div>
      <form>
        <label>
          <p> pet type</p>
          <input type="search" />
        </label>
        {isAdvanced && (
          <div>
            <label>
              <p>Status</p>
              <input type="search" />
            </label>
            <label>
              <p>Height</p>
              <input type="search" />
            </label>
            <label>
              <p>Weight</p>
              <input type="search" />
            </label>
            <label>
              <p>Type</p>
              <input type="search" />
            </label>
            <label>
              <p>Name</p>
              <input type="search" />
            </label>
          </div>
        )}
      </form>
      <button
        onClick={() => {
          setIsAdvanced(true);
        }}
      >
        Advance search
      </button>
    </div>
  );
}

import React, { useState } from "react";

export default function Card() {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <div>
      <img src="https://dog.ceo/api/breeds/image/random" alt="dog" />
      <p>name</p>
      <p>state</p>
      <button
        onClick={() => {
          setSeeMore(true);
        }}
      >
        see more
      </button>
      {seeMore && (
        <div>
          <p>Type </p>
          <p>Name</p>
          <p> Adoption Status</p>
          <p> Picture</p>
          <p> Height</p>
          <p>Weight</p>
          <p> Color</p>
          <p> Bio, Hypoallergenic (yes/no)</p>
          <p> dietary restrictions</p>
          <p>breed of animal (Poodle, Siamese) </p>
        </div>
      )}
      <button>Its not the (pet) its me</button>
      <button>I can see a futere</button>
      <button>maybe later</button>
    </div>
  );
}

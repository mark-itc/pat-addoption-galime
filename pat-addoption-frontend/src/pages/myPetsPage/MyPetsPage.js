import React, { useState } from "react";
import Card from "../../components/modals/Card";

export default function MyPetsPage() {
  const [switchPage, setSwitchPage] = useState(false);

  return (
    <div>
      {!switchPage && (
        <div>
          <p>all the pets: you currently do not own or foster any pets</p>
          <button
            onClick={() => {
              setSwitchPage(true);
            }}
          >
            saved pets
          </button>
          <Card />
        </div>
      )}
      {switchPage && (
        <div>
          <p>saved pets: you currently do not own or foster any pets</p>
          <button
            onClick={() => {
              setSwitchPage(false);
            }}
          >
            all pets
          </button>
        </div>
      )}
    </div>
  );
}

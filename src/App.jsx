import { useState } from 'react'
import './App.css'

function App() {
  const [flavors, setFlavors] = useState([
    {
      id: 1,
      name: "Vanilla",
      isSoldOut: false,
      scoopsSelected: 0
    },
    {
      id: 2,
      name: "Chocolate",
      isSoldOut: false,
      scoopsSelected: 0
    },
    {
      id: 3,
      name: "Strawberry",
      isSoldOut: false,
      scoopsSelected: 0
    },
    {
      id: 4,
      name: "Pistachio",
      isSoldOut: true,
      scoopsSelected: 0
    },
    {
      id: 5,
      name: "Mango",
      isSoldOut: false,
      scoopsSelected: 0
    }
  ]);
  const [scoopLimit, setScoopLimit] = useState(5);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);


const totalScoops = flavors.reduce((total, flavor) => {
  return total + flavor.scoopsSelected; }, 0);

const totalPrice = totalScoops * 5;


const visibleFlavors = showOnlyAvailable ? flavors.filter(flavor => !flavor.isSoldOut) : flavors;



function addScoop(id) {
  setFlavors(prevFlavors => {
    const currentTotal = prevFlavors.reduce((total, flavor) => total + flavor.scoopsSelected,0);

    if (currentTotal >= scoopLimit) {
      return prevFlavors;
    }

    return prevFlavors.map(flavor => {
      if (flavor.id === id && !flavor.isSoldOut) {
        return {
          ...flavor,
          scoopsSelected: flavor.scoopsSelected + 1
        };
      }

      return flavor;
    });
  });
}



function removeScoop(id) {
  setFlavors(prevFlavors =>
    prevFlavors.map(flavor => {
      if (flavor.id === id && !flavor.isSoldOut && flavor.scoopsSelected > 0) {
        return {
          ...flavor,
          scoopsSelected: flavor.scoopsSelected - 1
        };
      }

      return flavor;
    })
  );
}


 
return (
  <div className="kiosk">
    <h1>Ice-Cream Kiosk 🍦</h1>

    {totalScoops >= scoopLimit && (<p className="limit-warning">Scoop limit reached!</p>)}

    <h2>Our Flavors</h2>

    <label>
      <input
        type="checkbox"
        checked={showOnlyAvailable}
        onChange={() => setShowOnlyAvailable(!showOnlyAvailable)}/>
      Show only available
    </label>

    {showOnlyAvailable && visibleFlavors.length === 0 && (<p>No flavors to show</p>)}

    <div className="flavors-grid">
      {visibleFlavors.map((flavor) => (
        <div
          key={flavor.id}
          className={flavor.isSoldOut ? "flavor-card sold-out" : "flavor-card"}>
          <h3>{flavor.name}</h3>

          {flavor.isSoldOut && (<span className="sold-out-badge">Sold Out</span>)}

          <p>Selected scoops: {flavor.scoopsSelected}</p>

          <button
            onClick={() => addScoop(flavor.id)}
            disabled={flavor.isSoldOut || totalScoops >= scoopLimit} >
            +
          </button>

          <button
            onClick={() => removeScoop(flavor.id)}
            disabled={flavor.isSoldOut || flavor.scoopsSelected === 0} >
            -
          </button>
        </div>
      ))}
    </div>

   <div className="order-summary">
    <h2>Order Summary</h2>
    
    <p>Total scoops: {totalScoops}</p>
    <p>Total price: ${totalPrice}</p>

    {totalScoops === 0 && (<p>Your order is empty</p>)}
    </div>
  </div>
);

}

export default App;

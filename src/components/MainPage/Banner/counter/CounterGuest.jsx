import { useState, useEffect } from "react";
import useFindStore from "../../../../stores/useFindStore";
const CounterGuest = () => {
  const {guests, incrementGuests, decrementGuests} = useFindStore()
  const [countGuest, setCountGuest] = useState(guests);
  
  useEffect(() => {
    setCountGuest(guests)
  }, [guests])
  
  const increment = () =>{
     setCountGuest(prev => prev + 1 < 6 ? prev + 1 : prev = 6  );
     incrementGuests()
  }
  const decrement = () => {
    setCountGuest(prev => (prev > 1 ? prev - 1 : 1))
  decrementGuests()
  };
  
  return (
    <main className="w-full flex justify-center items-center">
      <div className="w-full flex justify-between items-center rounded-2xl border border-gray-300 text-center py-2 px-4 cursor-pointer bg-white hover:bg-blue-50 transition-colors duration-300 shadow-sm hover:shadow-md">
        
        <button
          onClick={decrement}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
        >
          −
        </button>

        <span className="text-lg font-medium">{countGuest < 6 ? countGuest : "6+"}</span>

        <button
          onClick={increment}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
        >
          +
        </button>
      </div>
    </main>
  );
};

export default CounterGuest;

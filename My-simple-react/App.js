
import React, { useState } from 'react';

function App() {
 
  const [count, setCount] = useState(0);


  const incrementCount = () => {
    setCount(count + 1);
  };

  
  return (

    <div className="min-h-screen bg-blue-500 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Hello from React!</h1>
      <p className="text-xl mb-6">This is your very first React app.</p>

    
      <p className="text-2xl mb-4">You clicked the button: {count} times</p>

   
      <button
        onClick={incrementCount}
        className="bg-white text-blue-700 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300"
      >
        Click Me!
      </button>

      <footer className="mt-10 text-sm opacity-80">
        <p>&copy; 2024 Your Learning App</p>
      </footer>
    </div>
  );
}


export default App;

import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import MainApp from "./MainApp"; // your actual app

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4100); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? <SplashScreen /> : <MainApp />}
    </>
  );
}

export default App;

import React, { useState } from "react";
import MainTitle from "./components/MainTitle";
import MainContents from "./components/MainContents";

const App: React.FC = () => {
  const [showContents, setShowContents] = useState(false);

  // Should this be here?
  window.addEventListener("keypress", event => {
    if (showContents) return;
    if (event.key === "q") setShowContents(true);
  });

  return (
    <>
      {showContents && <MainContents />}
      {!showContents && <MainTitle setShowContents={setShowContents} />}
    </>
  );
};

export default App;

import { useState, useEffect } from "react";

function useConfetti() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return showConfetti;
}

export default useConfetti;

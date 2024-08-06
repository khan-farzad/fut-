import { useEffect, useState } from "react";
import { IoDiamond } from "react-icons/io5";

const TotalPoints = () => {
  const [points, setPoints] = useState(0);
  const validGame = ["noob-to-pro", "blind-75", "cap"];
  const getTotalPoints = () => {
    try {
      let tempPoints = 0;
      validGame.forEach((game) => {
        const localGame = localStorage.getItem(game);
        if (!localGame) return;
        tempPoints += JSON.parse(localGame).length;
      });

      setPoints(tempPoints);
    } catch (error) {}
  };

  useEffect(() => {
    getTotalPoints();
  }, []);
  return (
    <div className="fixed top-2 right-10 flex-center gap-2">
      <IoDiamond className="rotate-diamond" />
      <p>{points * 10}</p>
    </div>
  );
};

export default TotalPoints;

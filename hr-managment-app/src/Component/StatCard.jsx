import React, { useState, useEffect } from 'react';
import "./StatCardStyles.css";

function StatCard({ title, value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue(displayValue => {
        const increment = Math.ceil(value / 90); 
        if (displayValue + increment >= value) {
          clearInterval(interval);
          return value;
        } else {
          return displayValue + increment;
        }
      });
    }, 10); 
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="statCard">
      <p className="statCardp1">{title}</p>
      <p className="statCardp2">{displayValue}</p>
    </div>
  );
}

export default StatCard;

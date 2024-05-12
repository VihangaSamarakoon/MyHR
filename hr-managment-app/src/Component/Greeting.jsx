import React, { useState, useEffect } from "react";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 0 && currentTime < 12) {
      setGreeting("Good Morning,");
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting("Good Afternoon,");
    } else {
      setGreeting("Good Night,");
    }
  }, []);

  // Define styles for "Good" and "Morning"
  const goodStyle = { color: "#0d0c22", fontSize: "32px", fontWeight: "500" };
  const timeOfDayStyle = { color: "#4188f1", fontSize: "32px", fontWeight: "500"  };

  // Split the greeting into words
  const words = greeting.split(" ");

  return (
    <div>
      <span style={goodStyle}>{words[0]} </span>
      <span style={timeOfDayStyle}>{words.slice(1).join(" ")}</span>
    </div>
  );
};

export default Greeting;

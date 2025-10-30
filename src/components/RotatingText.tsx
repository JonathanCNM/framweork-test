import { useEffect, useState } from "react";
import { BodyCopy } from "./BodyCopy";

const RotatingText = ({
  messages = [],
  textColor,
}: {
  messages: string[];
  textColor: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);
  return (
    <BodyCopy textColor={textColor} className="animate-fade">
      {messages[index]}
    </BodyCopy>
  );
};

export default RotatingText;

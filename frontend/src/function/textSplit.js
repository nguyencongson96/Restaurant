import React from "react";

const textSplit = (text, type) => {
  if (type === "word") {
    const textArray = text.split(" ");
    return textArray.map((char, index) => (
      <span className="spin-word" key={index} style={{ "--i": index }}>
        {`${char} `}
      </span>
    ));
  } else {
    const textArray = text.split("");
    return textArray.map((char, index) => (
      <span className="spin-char" key={index} style={{ "--i": index }}>
        {char}
      </span>
    ));
  }
};

export default textSplit;

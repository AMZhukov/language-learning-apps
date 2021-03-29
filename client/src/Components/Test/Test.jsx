import React, { useState } from "react";
import "./Test.css";

const Test = () => {
  // let error = "test__input-error";

  const [isError, setError] = useState("");

  console.log(isError);
  const checkWords = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value === "Сливать") {
        setError("Правильно");
        alert("Правильно");
        setTimeout(function () {
          console.log(isError);
        }, 0);
      } else {
        // setError("test__input-error");
        alert("Неправильно");


        // setError("test__input-error");
      }
    } else {
      // setError("");
    }
  };

  return (
    <div className="test">
      <div className="test__container container">
        {/*<form action="" onSubmit={(event) => checkWords(event)}>*/}
        <p className="test__header">1. What does mean the word “sliphold”?</p>
        <input
          className={"test__input "}
          type="text"
          onKeyPress={(e) => checkWords(e)}
        />
        {/*</form>*/}
      </div>
    </div>
  );
};
export { Test };

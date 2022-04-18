import { useState, useCallback } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import KEYS from "./constants/Keys";
import "./App.css";

function App() {
  const [lastValue, setLastValue] = useState("");

  const [firstValue, setFirstValue] = useState("");
  const [operator, setOperator] = useState("");
  const [isResultSet, setIsResultSet] = useState(false);

  const calculate = useCallback(() => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(lastValue);

    if (!num1 || !num2 || !operator) return;

    switch (operator) {
      case "plus":
        setLastValue(num1 + num2);
        break;
      case "minus":
        setLastValue(num1 - num2);
        break;
      case "multiply":
        setLastValue(num1 * num2);
        break;
      case "divide":
        setLastValue(num1 / num2);
        break;

      default:
        break;
    }
    setOperator("");
    setIsResultSet(true);
  }, [firstValue, lastValue, operator]);

  const init = useCallback(() => {
    setFirstValue("");
    setLastValue("");
  }, []);

  const handleButtonClick = useCallback(
    ({ type, caption }) => {
      switch (type) {
        case "number":
          if (isResultSet) {
            setIsResultSet(false);
            setLastValue(caption);
          } else {
            setLastValue(lastValue + caption);
          }
          break;

        case "point":
          if (lastValue.includes(".")) return;

          if (isResultSet) {
            setIsResultSet(false);
            setLastValue(caption);
          } else {
            setLastValue(lastValue + caption);
          }
          break;

        case "plus":
          setOperator("plus");
          setFirstValue(lastValue);
          setLastValue("");
          break;
        case "minus":
          setOperator("minus");
          setFirstValue(lastValue);
          setLastValue("");
          break;
        case "multiply":
          setOperator("multiply");
          setFirstValue(lastValue);
          setLastValue("");
          break;
        case "divide":
          setOperator("divide");
          setFirstValue(lastValue);
          setLastValue("");
          break;

        case "result":
          calculate();
          break;

        case "init":
          init();
          break;

        default:
          break;
      }
    },
    [calculate, init, isResultSet, lastValue]
  );

  return (
    <div className="calculator">
      <Input value={lastValue} readOnly />
      <div className="board">
        {KEYS.map((key) => (
          <div key={key.caption} className={key?.span ? "span-2" : ""}>
            <Button
              className="span-2"
              onClick={() => handleButtonClick(key)}
              {...key}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

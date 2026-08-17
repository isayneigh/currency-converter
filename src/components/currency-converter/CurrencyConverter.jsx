import "./CurrencyConverter.css";
import CurrencySelector from "./currency-selector/CurrencySelector";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import currencyIcon from "../../../assets/money.png";

export default function CurrencyConverter(props) {
  library.add(fas);
  var [fromCurrency, setFromCurrency] = useState("USD");
  var [toCurrency, setToCurrency] = useState("USD");
  var [fromAmount, setFromAmount] = useState(0);
  var [toAmount, setToAmount] = useState(0);

  fetch("https://open.er-api.com/v6/latest/" + fromCurrency)
    .then((result) => result.json())
    .then((json) => {
      var calculatedToAmount = fromAmount * json.rates[toCurrency];
      setToAmount(isNaN(calculatedToAmount) ? "" : calculatedToAmount);
    });

  return (
    <>
      <div className="converter-container">
        <img width="125px" height="125px" src={currencyIcon}></img>
        <h3>Currency Converter</h3>
        <CurrencySelector
          convertedValue={fromAmount}
          valueChanged={(value, code) => {
            setFromCurrency(code);
            setFromAmount(value);
          }}
        ></CurrencySelector>
        <div className="direction-container">
          <FontAwesomeIcon icon="fa-solid fa-arrow-down-long" />
        </div>
        <CurrencySelector
          convertedValue={toAmount}
          valueChanged={(value, code) => {
            setToCurrency(code);
            setToAmount(value);
          }}
        ></CurrencySelector>
      </div>
    </>
  );
}

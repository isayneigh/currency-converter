import "./CurrencyConverter.css";
import CurrencyConverterFrom from "./currency-converter-from/CurrencyConverterFrom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import currencyIcon from "../../../assets/money.png"
export default function CurrencyConverter(props) {
  library.add(fas);
  var [fromCurrency, setFromCurrency] = React.useState("USD");
  var [toCurrency, setToCurrency] = React.useState("USD");
  var [fromAmount, setFromAmount] = React.useState(0);
  var [toAmount, setToAmount] = React.useState(0);
  var fromDestination = React.useRef(false);
  var bypassFirstEffectTrigger = React.useRef(false);

  if (bypassFirstEffectTrigger.current) {
    fetch(
      "https://open.er-api.com/v6/latest/" +
        (!fromDestination.current ? fromCurrency : toCurrency)
    )
      .then((result) => result.json())
      .then((json) => {
        var currency = fromDestination.current ? fromCurrency : toCurrency;
        if (!fromDestination.current) {
          var calculatedToAmount = fromAmount * json.rates[currency];
          setToAmount(isNaN(calculatedToAmount) ? "" : calculatedToAmount);
        } else {
          var calculatedFromAmount = toAmount * json.rates[currency];
          setFromAmount(
            isNaN(calculatedFromAmount) ? "" : calculatedFromAmount
          );
        }
      });
  } else bypassFirstEffectTrigger.current = true;

  function currencyValueChange(value, code, fromDestinationValue) {
    fromDestination = fromDestinationValue;
    setFromCurrency(code);
    setFromAmount(value);
  }

  return (
    <div className="converter-container">
        <img width="125px" height="125px" src={currencyIcon}></img>
        <h3>Currency Converter</h3>
      <CurrencyConverterFrom convertedValue={fromAmount} valueChanged={(value, code) => currencyValueChange(value, code, false)}></CurrencyConverterFrom>
      <div class="direction-container">
        <FontAwesomeIcon icon="fa-solid fa-arrow-up-long" />
        <FontAwesomeIcon icon="fa-solid fa-arrow-down-long" />
      </div>
      <CurrencyConverterFrom
        convertedValue={toAmount}
        valueChanged={(value, code) => currencyValueChange(value, code, true)}
      ></CurrencyConverterFrom>
    </div>
  );
}

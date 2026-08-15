import "./CurrencyConverter.css"
import CurrencyConverterFrom from "./currency-converter-from/CurrencyConverterFrom"
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

export default function CurrencyConverter(props) {
    library.add(fas)
    var [fromCurrency, setFromCurrency] = React.useState('USD')
    var [toCurrency, setToCurrency] = React.useState('USD')
    var [fromAmount, setFromAmount] = React.useState(0)
    var [toAmount, setToAmount] = React.useState(0)
    var [fromDestination, setFromDestination] = React.useState(false);
    var [bypassFirstEffectTrigger, setBypassFirstEffectTrigger] = React.useState(false);

    if (bypassFirstEffectTrigger) {
        fetch("https://open.er-api.com/v6/latest/" + (!fromDestination ? fromCurrency : toCurrency))
        .then(result => result.json())
        .then((json) => {
            console.log((!fromDestination ? fromCurrency : toCurrency));
            var currency = (fromDestination ? fromCurrency : toCurrency);
            console.log(currency);
            if (!fromDestination) {
                var calculatedToAmount = fromAmount * json.rates[currency];
                console.log(calculatedToAmount)
                setToAmount(isNaN(calculatedToAmount) ? '' : calculatedToAmount);     
            } else {
                console.log(json.rates);
                console.log(toAmount)
                var calculatedFromAmount = toAmount * json.rates[currency];
                setFromAmount(isNaN(calculatedFromAmount) ? '' : calculatedFromAmount);     
            }
        })
    }
    else
        setBypassFirstEffectTrigger(true)

    return (
        <div className="converter-container">
            <CurrencyConverterFrom convertedValue={fromAmount} valueChanged={(value, code) => {  setFromDestination(false);setFromCurrency(code); setFromAmount(value);}}></CurrencyConverterFrom>
            <div class="direction-container">
                <FontAwesomeIcon icon="fa-solid fa-arrow-up-long" />           
                <FontAwesomeIcon icon="fa-solid fa-arrow-down-long" />  
            </div>           
            <CurrencyConverterFrom convertedValue={toAmount} valueChanged={(value, code) => { setFromDestination(true);setToCurrency(code);setToAmount(value);}}></CurrencyConverterFrom>
        </div>
    )
}
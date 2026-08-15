import { data } from "currency-codes";
import getSymbolFromCurrency from "currency-symbol-map";
import { v4 as uuidv4 } from 'uuid';
import React from "react";
import "./CurrencyConverterFrom.css"
import CurrencyInput from 'react-currency-input-field';
import { getLocales } from 'locale-currency';

export default function CurrencyConverterFrom(props) {
    const [code, setCode] = React.useState("USD");
    const [symbol, setSymbol] = React.useState("$");
    const [currencyValue, setCurrencyValue] = React.useState(0);

    function onCodeChange($event) {
        const code = $event.target.value;
        setCode(code);
        setSymbol(getSymbolFromCurrency(code))
        console.log(currencyValue)
        props.valueChanged(currencyValue, code);
    }

    function onValueChanged(value, name, values) {
        props.valueChanged(value, code);
        setCurrencyValue(value);
    }
    return (
        <form className="form-container">
            
            <select onChange={onCodeChange} value={code}>
                {data.map(c => <option key={uuidv4()} value={c.code}>{c.code} - {c.currency}</option>)}
            </select>
            <CurrencyInput prefix={symbol} decimalsLimit={2} transformRawValue={(val) => val === undefined ? 0 : val} onValueChange={onValueChanged} value={props.convertedValue} defaultValue={currencyValue} />        
        </form>
    )
}
import { data } from "currency-codes";
import getSymbolFromCurrency from "currency-symbol-map";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import "./CurrencySelector.css"
import CurrencyInput from 'react-currency-input-field';

export default function CurrencySelector(props) {
    const [code, setCode] = useState("USD");
    const [symbol, setSymbol] = useState("$");
    const [currencyValue, setCurrencyValue] = useState(0);

    function onCodeChange($event) {
        const code = $event.target.value;
        setCode(code);
        setSymbol(getSymbolFromCurrency(code))
        props.valueChanged(currencyValue, code);
    }

    function onValueChanged(value, name, values) {
        props.valueChanged(value, code);
        setCurrencyValue(value);
    }
    return (
        <div className="container">
            <select onChange={onCodeChange} value={code}>
                {data.map(c => <option key={uuidv4()} value={c.code}>{c.code} - {c.currency}</option>)}
            </select>
            <CurrencyInput prefix={symbol} decimalsLimit={2} transformRawValue={(val) => val === undefined ? 0.00 : val} onValueChange={onValueChanged} value={props.convertedValue} defaultValue={0} />        
        </div>
    )
}
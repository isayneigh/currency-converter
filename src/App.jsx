import { createRoot } from 'react-dom/client';
import CurrencyConverter from './components/currency-converter/CurrencyConverter';
import "./App.css"

var root = createRoot(document.getElementById("root"));
function App() {
  return (
    <>
      <CurrencyConverter>
      </CurrencyConverter>
    </>
  )
}

root.render(<App></App>);


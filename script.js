const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const resultText = document.getElementById("result-text");

async function convertCurrency() {
  const amountVal = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amountVal) || amountVal <= 0) {
    resultText.innerText = "Please enter a valid amount";
    return;
  }

  resultText.innerText = "Converting...";

  try {

    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await response.json();

    if (data.result === "success") {
      const rate = data.rates[to];
      const convertedAmount = (amountVal * rate).toFixed(2);
      resultText.innerText = `${amountVal} ${from} = ${convertedAmount} ${to}`;
    } else {
      resultText.innerText = "Error fetching rates!";
    }
  } catch (error) {
    resultText.innerText = "Failed to load exchange rates.";
    console.error("API Error:", error);
  }
}

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  convertCurrency();
});

window.addEventListener("load", convertCurrency);
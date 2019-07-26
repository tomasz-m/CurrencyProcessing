import { getCurrencies } from "../networking/Currencies";

const multiply = (multiplyBy, rates) =>
  Object.keys(rates).reduce((result, key) => {
    result[key] = rates[key] * multiplyBy;
    return result;
  }, {});

const createLatestValues = currencies => amount =>
  currencies
    .then(response => response.rates)
    .then(rates => multiply(amount, rates));

export const latestValues = createLatestValues(getCurrencies());

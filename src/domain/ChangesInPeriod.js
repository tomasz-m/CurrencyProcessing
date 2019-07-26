import { getCurrencies } from "../networking/Currencies";

const getRelativeChanges = (from, to) => {
  return Object.keys(from).reduce((result, key) => {
    result[key] = (from[key] - to[key]) / to[key];
    return result;
  }, {});
};

export const createChangesInPeriod = currencies => (from, to) =>
  Promise.all([currencies(from), currencies(to)]).then(response =>
    getRelativeChanges(response[0].rates, response[1].rates)
  );

export const changesInPeriod = createChangesInPeriod(getCurrencies);

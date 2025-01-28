const queryCreate = (
  EquityUserIdVal,
  EquityBalanceVal,
  EquityInformationVal
) => {
  let query = `
  INSERT
  INTO Equity
  (EquityUserId, EquityBalance, EquityInformation) 
  VALUES
  ('${EquityUserIdVal}','${EquityBalanceVal}','${EquityInformationVal}')
  `;
  return query;
};

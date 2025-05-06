const CompanySchema = `
CREATE TABLE IF NOT EXISTS
Company (
  CompanyId INTEGER PRIMARY KEY,                
  CompanyName TEXT,                
  CompanyEst TEXT,                
  CompanyImg BLOB,                                                         
  CompanyInfo TEXT                
)
`;
export default CompanySchema;

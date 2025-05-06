const queryRead = `
SELECT * FROM Company `;

const queryRead1 = `
SELECT 
CompanyName 
From Company`;

const queryUpdate = `
UPDATE 
Company 
SET CompanyName = ?,
    CompanyEst = ?, 
    CompanyImg = ?,
    CompanyInfo = ?
WHERE CompanyId = ?
`;
export { queryRead, queryRead1, queryUpdate };

export const createTableUtang = () => {
  return `CREATE TABLE Utang(
            UtangId INTEGER PRIMARY KEY AUTOINCREMENT,
            UtangYYYYMMDD TEXT,
            UtangPerson TEXT,
            UtangHMS TEXT,
            UtangRp INTEGER,
            UtangInfo TEXT
            UtangRefKas INTEGER,
            FOREIGN KEY (UtangRefKas) REFERENCES Kas(KasId)
        )`;
};

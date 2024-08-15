export const createTablePiutang = () => {
  return `CREATE TABLE Piutang(
              PiutangId INTEGER PRIMARY KEY AUTOINCREMENT,
              PiutangYYYYMMDD TEXT,
              PiutangPerson TEXT,
              PiutangHMS TEXT,
              PiutangRp INTEGER,
              PiutangInfo TEXT
            )`;
};

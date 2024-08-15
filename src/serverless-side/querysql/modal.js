export const createTableModal = () => {
  return `CREATE TABLE Modal(
              ModalId INTEGER PRIMARY KEY AUTOINCREMENT,
              ModalYYYYMMDD TEXT,
              ModalHMS TEXT,
              ModalHMS TEXT,
              ModalPerson TEXT,
              ModalRp INTEGER,
              ModalInfo TEXT
            )`;
};

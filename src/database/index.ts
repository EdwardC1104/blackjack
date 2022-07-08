import connect, { sql, SQLQuery } from "@databases/expo";

const db = connect("blackjack");

const createUsersTable = () =>
  db.tx(function* (tx) {
    yield tx.query(sql`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        avatar TEXT NOT NULL
      );
  `);
  });

async function addUser(id: string, name: string, avatar: string) {
  await db.query(sql`
    INSERT INTO users (id, name, avatar)
    VALUES (${id}, ${name}, ${avatar});
    ON CONFLICT (id) DO UPDATE
    SET name=excluded.name;
  `);
}

async function deleteUser(id: string) {
  await db.query(sql`
    DELETE From users WHERE id = ${id};
  `);
}

async function getUsers() {
  return (await db.query(sql`
    SELECT * FROM users;
  `)) as User[];
}

async function getUser(id: string) {
  return (
    await db.query(sql`
    SELECT * FROM users
    WHERE id = ${id}
    LIMIT 1;
  `)
  )[0] as User;
}

const createWinnersTable = () =>
  db.tx(function* (tx) {
    yield tx.query(sql`
    CREATE TABLE IF NOT EXISTS winners (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userID TEXT NOT NULL,
          didWin INTEGER NOT NULL,
          FOREIGN KEY(userID)
            REFERENCES users(id)
      );
  `);
  });

async function addWinner(id: string, didWin: boolean) {
  await db.query(sql`
    INSERT INTO winners (userID, didWin)
    VALUES (${id}, ${didWin});
  `);
}

async function getWinners() {
  return (await db.query(sql`
    SELECT * FROM winners;
  `)) as { userID: string; didWin: boolean }[];
}

export default db;
export {
  createUsersTable,
  addUser,
  getUsers,
  deleteUser,
  getUser,
  createWinnersTable,
  addWinner,
  getWinners,
};

import connect, { sql } from "@databases/expo";

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

export default db;
export { createUsersTable, addUser, getUsers, deleteUser, getUser };

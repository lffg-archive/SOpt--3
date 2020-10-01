import * as knex from 'knex';

// Conexão "fake" para testes:
const db = knex({} as knex.Config);

type SearchResponse<Fields extends string> =
  | { userExists: false; data: null }
  | { userExists: true; data: Record<Fields, string> };

async function searchById<Fields extends string>(
  userId: string,
  request: Fields[]
): Promise<SearchResponse<Fields>> {
  const data = await db('users').select(request).where({ id: userId }).first();

  if (!data) return { userExists: false, data: null };

  return { userExists: true, data };
}

const res = await searchById('u:123', ['age', 'username']);

if (res.userExists) {
  res.data.age; // string
  res.data.username; // string
} else {
  res.data; // null
}

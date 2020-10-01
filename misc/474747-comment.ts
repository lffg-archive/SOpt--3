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

// Código no TypeScript playground:
// https://www.typescriptlang.org/play?noUnusedParameters=true&esModuleInterop=false&target=99#code/JYWwDg9gTgLgBAKjgQwM5wNYDsCmAPOAMyghDgHJt9yBuAKDoHpG4BhCXPAY4jgCJCyDDj5wwyKMjgwcqGagBcdAMYc5cACYAjOAF5MnABQBvAL4p0VPADp2WQsADmASnp0YATzA44AZRwSygAWAEqykFioOAA8AGLAOAA2Guj4MlgpcHJQwFiOAHx6dHBwAD5wxnAArlFQAKJ4wHKKRMiJUTSayDDICnBYVYmJcKbFZRXVtQ1NMC0wUFU4nRrdvXBhqlAacQnJqAA0WfO5BSNuaB5YykRVVzDAHFkBUMEAQh4AktvxSZlpOBl0NkTvlDGMajgoF8+sC8vsxlAcABHRZyPo-PYAbQAunRnH0AAokEBNGL+QKhcJqGIYlL5QrGMaqSLwFY9PQoADuyGArK0hnIEKgqHIzmsUUSOGUMEMiJRshgYs5QUhOBMcGAGj6Qq+IzFDmFMtcDBKwEIcEMAEI2chnHBETAqlAsBMhdNmn1BO0cIcbX0BkMzib7ThHc7XVNGh7pAsfV12aZ6KMVGp4Ij0PpkNzeU8Ke8vgKqgoAIwAJgAzORDpjyMhHDgqxQhVhkCAG9jjXQzRb09Y3VHZnbGSVezbrHWlnBmEccnkEbJrGPm63J9PYY46OYklEKvPUIvVp1pwHEpu6EA

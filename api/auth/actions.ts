import {fetcher} from 'utils/api';

export async function signup(firstName: string, lastName: string, email: string, password: string, username?: string): Promise<void> {
  await fetcher('/api/v2/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      username: username || email,
      password,
    }),
  });
}

const BASE_URL = 'https://challenge-server.tracks.run/memoapp';

export async function login(accessToken: string) {
  const response = await fetch(`${BASE_URL}/category`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-ACCESS-TOKEN': accessToken,
    },
  });
  return response;
}

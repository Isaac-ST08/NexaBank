const API_KEY =
  import.meta.env.VITE_FIREBASE_API_KEY;

interface FirebaseLoginResponse {
  idToken: string;
  refreshToken: string;
  localId: string;
  email: string;
}

export async function loginWithFirebase(
  email: string,
  password: string
) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    }
  );

  if (!response.ok) {
    throw new Error(
      "Firebase rechazó las credenciales."
    );
  }

  const data =
    (await response.json()) as FirebaseLoginResponse;

  localStorage.setItem(
    "nexabank_token",
    data.idToken
  );

  localStorage.setItem(
    "nexabank_refresh_token",
    data.refreshToken
  );

  return data;
}

export function logoutFromFirebase() {
  localStorage.removeItem("nexabank_token");
  localStorage.removeItem(
    "nexabank_refresh_token"
  );
}

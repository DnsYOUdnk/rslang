const base = 'https://react-learn-language.herokuapp.com/';

const addInLocalStorage = (user: string) => {
  localStorage.user = user;
};

export const createUser = async (name: string, email: string, password: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const response = await fetch(`${base}users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (res.status >= 400 && res.status < 600) {
        return res.status;
      }
      return res.status;
    })
    .catch((error) => {
      return error.statusCode;
    });
  setIsLoading(false);
  return response;
};

export const logIn = async (
  email: string,
  password: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const response = await fetch(`${base}signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => {
    if (res.status >= 400 && res.status < 600) {
      return { status: res.status };
    }
    return res.json();
  });
  const user = { status: 200, ...response };
  if (user.status === 200) {
    addInLocalStorage(JSON.stringify(user));
  }
  setIsLoading(false);
  return user;
};

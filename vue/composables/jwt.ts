let jwt = $(useSessionStorage<string | null>('token', null));

const setJwt = (value: string) => {
  jwt = value;
};

const unsetJwt = () => {
  jwt = null;
};

const jwtRef = $$(jwt);
export { jwtRef as jwt, setJwt, unsetJwt };

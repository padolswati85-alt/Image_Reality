const handleLogin = async () => {
  const { user, error } = await loginUser(loginEmail, loginPassword);
  if (error) return setLoginError(error);
  console.log("Logged in user:", user);
};

const handleRegister = async () => {
  const { user, error } = await registerUser(signEmail, signPassword, role);
  if (error) return setRegisterError(error);
  console.log("Registered user:", user);
};

// State for errors
const [loginError, setLoginError] = useState("");
const [registerError, setRegisterError] = useState("");

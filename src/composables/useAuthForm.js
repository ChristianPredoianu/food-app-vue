export function useAuthForm(formState) {
  function isUsernameValid() {
    if (formState.username.length > 3) return true;
  }

  function isEmailValid() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formState.email))
      return true;
  }

  function isPasswordValid() {
    if (formState.password.length > 5) return true;
  }

  function isRepeatPasswordValid() {
    if (
      formState.repeatPassword !== '' &&
      formState.repeatPassword === formState.password
    )
      return true;
  }

  return {
    isUsernameValid,
    isEmailValid,
    isPasswordValid,
    isRepeatPasswordValid,
  };
}

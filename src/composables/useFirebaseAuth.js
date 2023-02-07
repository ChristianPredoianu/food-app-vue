import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export function useFirebaseAuth(formState) {
  const signUpError = ref(null);
  const signInError = ref(null);

  const router = useRouter();

  const auth = getAuth();

  function signUserUp() {
    signUpError.value = null;

    createUserWithEmailAndPassword(auth, formState.email, formState.password)
      .then(() => {
        signUpError.value = 'Account Created';

        setTimeout(() => {
          router.push({ name: 'SignIn' });
        }, 2000);

        updateProfile(auth.currentUser, {
          displayName: formState.username,
        });
      })

      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          signUpError.value = 'The Email is already in use';
        }
      });
  }

  function signUserIn() {
    signInError.value = null;

    signInWithEmailAndPassword(auth, formState.email, formState.password)
      .then(() => {
        signInError.value = 'Signin in...';

        setTimeout(() => {
          router.push({ name: 'Admin' });
        }, 2000);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          signInError.value = 'The entered Email adress is not found';
        } else if (error.code === 'auth/wrong-password') {
          signInError.value = 'Wrong password';
        } else {
          signInError.value = ' Something went wrong, please try again.';
        }
      });
  }

  return { signUserUp, signUserIn, signUpError, signInError };
}

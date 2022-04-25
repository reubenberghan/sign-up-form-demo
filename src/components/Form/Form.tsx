import React, { useState } from 'react';
import isValidEmail from '../../utils/isValidEmail';
import isValidPassword from '../../utils/isValidPassword';
import makeFieldValidator from '../../utils/makeFieldValidator';
import styles from './Form.module.css';

type FieldState = {
  name: string;
  message: string | null;
  state: 'dirty' | 'missing' | 'invalid' | 'valid';
  value: string;
};

type FormState = {
  message: string | null;
  state: 'invalid' | 'unvalidated' | 'valid';
};

export const usernameMessages = {
  invalid: 'Username is not a valid email. Please enter a valid email.',
  missing: 'Please enter a username.',
};

export const passwordMessages = {
  invalid:
    'Password is not valid. Please enter a password with at least one uppercase, one numeric, and one special character.',
  missing: 'Please enter a password.',
};

export const passwordConfirmMessages = {
  invalid:
    'Confirmed password should match your entered password. Please check the entered passwords.',
  missing: 'Please confirm your password.',
};

function Form() {
  /**
   * Initialise field and form state.
   */
  const [username, setUsername] = useState<FieldState>({
    message: usernameMessages.missing,
    name: 'username',
    state: 'missing',
    value: '',
  });
  const [password, setPassword] = useState<FieldState>({
    message: passwordMessages.missing,
    name: 'password',
    state: 'missing',
    value: '',
  });
  const [passwordConfirm, setPasswordConfirm] = useState<FieldState>({
    message: passwordConfirmMessages.missing,
    name: 'password-confirm',
    state: 'missing',
    value: '',
  });
  const [formState, setFormState] = useState<FormState>({
    message: null,
    state: 'unvalidated',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /**
     * Validate Username field and update state
     */
    const usernameState = makeFieldValidator(isValidEmail)(username.value);

    setUsername({
      ...username,
      message:
        usernameState !== 'valid' ? usernameMessages[usernameState] : null,
      state: usernameState,
    });

    /**
     * Validate Password field and update state
     */
    const passwordState = makeFieldValidator(isValidPassword)(password.value);

    setPassword({
      ...password,
      message:
        passwordState !== 'valid' ? passwordMessages[passwordState] : null,
      state: passwordState,
    });

    /**
     * Validate Confirm password field and update state
     */
    const passwordConfirmState = makeFieldValidator(
      (value: string) => value === password.value
    )(passwordConfirm.value);

    setPasswordConfirm({
      ...passwordConfirm,
      message:
        passwordConfirmState !== 'valid'
          ? passwordConfirmMessages[passwordConfirmState]
          : null,
      state: passwordConfirmState,
    });

    /**
     * Validate Form and update state
     */
    const formState =
      usernameState === 'valid' &&
      passwordState === 'valid' &&
      passwordConfirmState === 'valid'
        ? 'valid'
        : 'invalid';

    setFormState({
      message: formState === 'valid' ? 'Sign-up submitted successfully.' : null,
      state: formState,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor={username.name}>
        Username
      </label>
      <p className={styles.description}>
        Required. Should be a valid email address.
      </p>
      <input
        className={styles.input}
        id={username.name}
        name={username.name}
        type="text"
        onChange={(event) =>
          setUsername({
            ...username,
            state: 'dirty',
            value: event.target.value,
          })
        }
        value={username.value}
      />
      {formState.state !== 'unvalidated' && username.message && (
        <p className={styles.warning}>{username.message}</p>
      )}
      <label className={styles.label} htmlFor={password.name}>
        Password
      </label>
      <p className={styles.description}>
        Required. Should contain at least one uppercase, one numeric, and one
        special character.
      </p>
      <input
        className={styles.input}
        id={password.name}
        name={password.name}
        type={password.name}
        onChange={(event) =>
          setPassword({
            ...password,
            state: 'dirty',
            value: event.target.value,
          })
        }
        value={password.value}
      />
      {formState.state !== 'unvalidated' && password.message && (
        <p className={styles.warning}>{password.message}</p>
      )}
      <label className={styles.label} htmlFor={passwordConfirm.name}>
        Confirm password
      </label>
      <p className={styles.description}>
        Required. Should match the previously entered password.
      </p>
      <input
        className={styles.input}
        id={passwordConfirm.name}
        name={passwordConfirm.name}
        type="password"
        onChange={(event) =>
          setPasswordConfirm({
            ...passwordConfirm,
            state: 'dirty',
            value: event.target.value,
          })
        }
        value={passwordConfirm.value}
      />
      {formState.state !== 'unvalidated' && passwordConfirm.message && (
        <p className={styles.warning}>{passwordConfirm.message}</p>
      )}
      <button className={styles.submit} type="submit">
        Submit
      </button>
      {formState.state !== 'unvalidated' && formState.message && (
        <p className={styles.success}>{formState.message}</p>
      )}
    </form>
  );
}

export default Form;

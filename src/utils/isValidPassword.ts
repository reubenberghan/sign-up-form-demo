/**
 * Must contain at least one uppercase, one numeric, and one special character.
 * Special characters as defined by OWASP (though this list may be constrained
 * by the backend system).
 * https://owasp.org/www-community/password-special-characters
 */
const validPasswordRegExp =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/;

function isValidPassword(password?: string) {
  return password ? validPasswordRegExp.test(password) : false;
}

export default isValidPassword;

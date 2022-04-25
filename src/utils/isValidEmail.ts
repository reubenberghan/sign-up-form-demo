/**
 * Using W3C email validation RegExp
 * https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
 */
const validEmailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function isValidEmail(email?: string) {
  return email ? validEmailRegExp.test(email) : false;
}

export default isValidEmail;

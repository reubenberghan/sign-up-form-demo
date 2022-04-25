import isEmpty from './isEmpty';

function makeFieldValidator(validationFunc: (value: string) => boolean) {
  return function fieldValidator(value: string) {
    if (isEmpty(value)) {
      return 'missing';
    }

    return validationFunc(value) ? 'valid' : 'invalid';
  };
}

export default makeFieldValidator;

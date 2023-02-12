import { AbstractControl } from '@angular/forms';

export class MathValidators {
  static addition(target: string, sourceOne: string, sourceTwo: string) {
    return (form: AbstractControl) => {
      //const { a, b, answer } = form.value;
      const sum = form.value[target];
      const fstNumber = form.value[sourceOne];
      const scndNumber = form.value[sourceTwo];
      if (fstNumber + scndNumber === parseInt(sum)) {
        return null;
      }
      return { addtion: true };
    };
  }
}

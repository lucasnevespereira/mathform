import { AbstractControl } from "@angular/forms";

export class MathValidators {
  // Static methods/function only have access to arguments and variables in their own scope
  // Static methods can be access without needing to initialize parent class, so:
  // -> we can call addition without initialize MathValidators
  //  ex: MathValidators.addition
  static addition(form: AbstractControl) {
    // destructured syntax
    const { a, b, answer } = form.value;

    if (a + b === parseInt(answer)) {
      // sends null cause there is no errors
      return null;
    } else {
      // sends addition true to form errors
      return { addition: true };
    }
  }
}

import { AbstractControl, ValidatorFn } from "@angular/forms";

export function releaseDateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = new Date(control.value) < new Date();
    return forbidden ? { 'forbiddenDate': {value: control.value} } : null;
  };
}

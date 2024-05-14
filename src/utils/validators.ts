import { AbstractControl, ValidatorFn } from "@angular/forms";

export function releaseDateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const forbidden = control.value < todayDate;
    return forbidden ? {forbiddenDate: {value: control.value}} : null;
  };
}


import {
  AbstractControl,
  AsyncValidatorFn,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  take,
} from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export class FormUtils {
  static printFormErrors(form: UntypedFormGroup) {
    const errors = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        errors.push({ name: name, error: controls[name].errors });
      }
    }

    console.log(errors);
  }

  static EmailExistsValidator(
    service: AuthenticationService,
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap(() =>
          service.checkEmailExists(control.value).pipe(
            map((res) => {
              return res.exists ? { inuse: true } : null;
            }),
          ),
        ),
      );
    };
  }

  static UsernameExistsValidator(
    service: AuthenticationService,
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap(() =>
          service.checkUsernameExists(control.value).pipe(
            map((res) => {
              return res.exists ? { inuse: true } : null;
            }),
          ),
        ),
      );
    };
  }

  static PasswordsMatchValidator(
    password: string,
    confirmPassword: string,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);
      // Slightly different validator as it grabs the control of the form
      // And sets errors like that
      if (
        passwordControl?.value !== confirmPasswordControl?.value &&
        confirmPasswordControl?.touched
      ) {
        confirmPasswordControl?.setErrors({ noMatch: true });
        return { passwordsMatch: true };
      } else {
        return null;
      }
    };
  }
}

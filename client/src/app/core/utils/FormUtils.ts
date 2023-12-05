import {
  AbstractControl,
  AsyncValidatorFn,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AuthenticationService } from '../../modules/authentication/authentication.service';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  take,
} from 'rxjs';

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

      if (
        passwordControl?.value !== confirmPasswordControl?.value &&
        confirmPasswordControl?.touched
      ) {
        confirmPasswordControl?.setErrors({ noMatch: true });
        return { passwordsMatch: true };
      } else {
        confirmPasswordControl?.setErrors(null);
        return null;
      }
    };
  }
}

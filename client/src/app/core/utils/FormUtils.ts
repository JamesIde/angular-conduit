import {
  AbstractControl,
  AsyncValidatorFn,
  UntypedFormGroup,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationService } from '../../modules/authentication/authentication.service';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
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
        distinctUntilChanged(),
        switchMap(() =>
          service.checkEmailExists(control.value).pipe(
            map((res) => {
              return res ? { inuse: true } : null;
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
        distinctUntilChanged(),
        switchMap(() =>
          service.checkUsernameExists(control.value).pipe(
            map((res) => {
              return res ? { inuse: true } : null;
            }),
          ),
        ),
      );
    };
  }
}

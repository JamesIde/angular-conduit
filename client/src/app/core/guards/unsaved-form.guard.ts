import { CanDeactivateFn } from '@angular/router';

export const unsavedFormGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};

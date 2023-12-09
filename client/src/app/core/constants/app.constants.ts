import { animate, style, transition, trigger } from '@angular/animations';

export const AppConstants = {
  REGEX: {
    ENGLISH_KEYBOARD_PATTERN:
      /^[a-zA-Z0-9 \!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]+$/,
    EMAIL_REGEX:
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
    INCLUDE_ONE_NUMBER_AND_UPPERCASE: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
  },
  ANIMATIONS: {
    SLIDE: [
      trigger('slide', [
        transition(':enter', [
          style({ height: 0 }),
          animate('200ms ease-in', style({ height: '*' })),
        ]),
        transition(':leave', [animate('200ms ease-in', style({ height: 0 }))]),
      ]),
    ],
    FADE: [
      trigger('fade', [
        transition('* => *', [
          style({ opacity: 0 }),
          animate(250, style({ opacity: 1 })),
        ]),
      ]),
    ],
  },
};

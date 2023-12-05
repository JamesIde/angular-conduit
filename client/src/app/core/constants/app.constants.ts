export const AppConstants = {
  REGEX: {
    ENGLISH_KEYBOARD_PATTERN:
      /^[a-zA-Z0-9 \!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]+$/,
    EMAIL_REGEX:
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
    INCLUDE_ONE_NUMBER_AND_UPPERCASE: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
  },
};

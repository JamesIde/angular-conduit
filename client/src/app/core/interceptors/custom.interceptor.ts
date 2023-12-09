import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({
    ...req,
    withCredentials: true,
  });

  return next(clonedReq);
};

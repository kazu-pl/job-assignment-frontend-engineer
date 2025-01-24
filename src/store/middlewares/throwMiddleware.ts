import { Middleware, UnknownAction } from "@reduxjs/toolkit";

const throwMiddleware: Middleware = () => next => action => {
  next(action);

  if ((action as UnknownAction)?.error) {
    throw (action as UnknownAction).payload;
  }
};

export default throwMiddleware;

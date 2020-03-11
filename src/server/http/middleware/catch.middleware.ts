import { Middleware } from "../../../types/middleware";


/**
 * @description
 * Pass errors in async middleware to error handling middleware
 * 
 * @param decorateMiddleware 
 */
export function catchMiddleware(decorateMiddleware: Middleware): Middleware {
  const decoratedMiddleware: Middleware = async (req, res, next) => {
    try {
      await decorateMiddleware(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  return decoratedMiddleware;
}
import { Middleware } from "../../types/middleware";


/**
 * @description
 * Pass errors in async middleware to error handling middleware
 * 
 * @param middleware 
 */
export function catchMiddleware(middleware: Middleware): Middleware {
  const applyMiddleware: Middleware = async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  return applyMiddleware;
}
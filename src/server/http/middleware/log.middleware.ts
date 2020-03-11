import { Middleware } from "../../../types/middleware";

/**
 * @description
 * Log requests
 */
export function logMiddleware(): Middleware {
  // TODO: verify
  return function doLogMiddleware(req, res, next) {
    const start = Date.now();
    res.once('close', () => {
      const end = Date.now();
      const dur = end - start;
      const msg = `${req.method.toUpperCase()} ${req.path} - ${dur} ms`
      if (dur < 25) console.log(msg);
      else if (dur < 50) console.warn(msg);
      else console.error(msg);
    });
    next();
  }
}
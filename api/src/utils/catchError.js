export const catchError = (action) => {
  return async (req, res, next) => {
    try {
      action(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

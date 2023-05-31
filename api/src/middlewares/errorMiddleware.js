export const errorMiddleware = (error, req, res, next) => {
  const { status, message, errors } = error;

  res.status(status).send({ status, message, errors });

  return res.status(500).send({
    message: 'Unexpected error'
  });
};

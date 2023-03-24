export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 3010,
  host: process.env.HOST || 'localhost',
});

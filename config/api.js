const { NODE_ENV } = process.env
const REST = {
  defaultLimit: 10,
  maxLimit: 100,
  rateLimit: 5,
  mode: NODE_ENV
}
export default REST

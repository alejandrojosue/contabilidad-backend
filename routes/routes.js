import apiCallsRoutes from './apicall.route.js'
import authRoutes from './auth.route.js'
import auditingRoutes from './auditing.route.js'
import companyRoutes from './company.route.js'
import customerRoutes from './customer.route.js'
import errorMessagesRoutes from './errorMessage.route.js'
import jobRoutes from './job.route.js'
import userRoutes from './user.route.js'
import paymentPlanRoutes from './paymentPlan.route.js'
import productReturnRoutes from './productReturn.route.js'
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export {
  apiCallsRoutes,
  auditingRoutes,
  authRoutes,
  companyRoutes,
  customerRoutes,
  errorMessagesRoutes,
  jobRoutes,
  userRoutes,
  paymentPlanRoutes,
  productReturnRoutes
}

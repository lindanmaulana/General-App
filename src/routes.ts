/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/"
export const DEFAULT_MEMBER_REDIRECT = "/"
export const DEFAULT_ADMIN_REDIRECT = "/dashboard"
export const REDIRECT_HOME = "/"
export const REDIRECT_AUTH = "/auth/login"

/**
 * An array of routes that are accesible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const ROUTESPUBLIC = ["/", "/auth/login", "/dashboard/login", "/dashboard/register"]

/**
 * The prefix of routes admin
 * These routes will reject if role !== "ADMIN"
 * @type {string}
 */
export const ROUTESPREFIXADMIN = "/dashboard"

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /
 * @type {string[]}
 */
export const ROUTESAUTHMEMBER = ["/auth/login", "/auth/register"]

export const ROUTESAUTHADMIN = ["/dashboard/login", "/dashboard/register"]
export const ROUTE_LOGIN_ADMIN = "/dashboard/login"
/**
 * The prefix for API authentication routes
 * Routes that start with the prefix are used for API authentication purpose
 * @type {string}
 */
export const APIPREFIX = "/api"
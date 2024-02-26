/**
 * Populate it by;
 * ```
 * declare global {
 *  interface AppBackingServices {
 *    // some name and type pair(s), e.g.;
 *    // mongo: MongoClient;
 *  }
 * }
 * ```
 */
interface AppBackingServices {
  _isBackingServices: true;
}

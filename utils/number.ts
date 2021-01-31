export class NumberUtils {
  /**
   * 取区间数
   * @return 返回的value介于A、B之间，若value小于min，返回min，若大于max，返回max
   *
   * @param a
   * @param b
   * @param c
   */
  static clamp(a: number, b: number, c: number): number {
    return Math.min(Math.max(a, b), c);
  }
}

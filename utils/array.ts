export class ArrayUtils {
  /**
   * 剔除重复
   * @param arr
   */
  static deduplicate<T>(arr: T[]) {
    return Array.from(new Set(arr));
  }

  /**
   *
   *  const arr = [1,2,[3,4]]
   *  console.log(ArrayUtils.flat(arr)) // [1,2,3,4]
   *
   * @param arr
   */
  static flat<T>(arr: T[]): T[] {
    return arr.reduce((acm: T[], item) => {
      const val = Array.isArray(item) ? ArrayUtils.flat(item) : item;
      return acm.concat(val);
    }, []);
  }

  /**
   * 返回通过测试（函数内判断）的数组的第一个元素的值
   * @param arr
   * @param pred
   */
  static find<T = any>(arr: Array<T>, pred: (args: T) => boolean): any {
    return arr.find(pred);
  }

  /**
   * 返回符合传入测试（函数）条件的数组元素索引
   * @param arr
   * @param pred
   */
  static findIndex<T = any>(arr: Array<T>, pred: (args: T) => boolean): number {
    return arr.findIndex(pred);
  }
}

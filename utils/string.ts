export class StringUtils {
  /**
   * 驼峰
   * @param str
   */
  static camelize(str: string): string {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
  }

  /**
   * 首字母大写
   * @param str
   */
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

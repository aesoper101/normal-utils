import { DragEventOptions } from "./types";

export default class DOMUtils {
  /**
   * 添加事件
   *
   * @param element
   * @param event
   * @param handler
   * @param useCapture
   */
  static addEventListener(
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject,
    useCapture = false
  ): void {
    if (element && event && handler) {
      element.addEventListener(event, handler, useCapture);
    }
  }

  /**
   * 移除事件
   *
   * @param element
   * @param event
   * @param handler
   */
  static removeEventListener(
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject
  ): void {
    if (element && event && handler) {
      element.removeEventListener(event, handler, false);
    }
  }

  /**
   * 触发拖拽事件
   *
   * @param element
   * @param options
   */
  static triggerDragEvent(
    element: HTMLElement,
    options: DragEventOptions
  ): void {
    let isDragging = false;

    const moveFn = function(event: Event) {
      options.drag?.(event);
    };

    const upFn = (event: Event) => {
      DOMUtils.removeEventListener(document, "mousemove", moveFn);
      DOMUtils.removeEventListener(document, "mouseup", upFn);
      document.onselectstart = null;
      document.ondragstart = null;

      isDragging = false;

      options.end?.(event);
    };

    DOMUtils.addEventListener(element, "mousedown", event => {
      if (isDragging) return;
      document.onselectstart = () => false;
      document.ondragstart = () => false;
      DOMUtils.addEventListener(document, "mousemove", moveFn);
      DOMUtils.addEventListener(document, "mouseup", upFn);

      isDragging = true;

      options.start?.(event);
    });

    return;
  }

  static getBoundingClientRect(element: HTMLElement): DOMRect | null {
    if (element && typeof element === "object" && element.nodeType === 1) {
      return element.getBoundingClientRect();
    }

    return null;
  }

  /**
   * 判断是否存在className样式
   *
   * @param element
   * @param className
   */
  public static hasClass(element: HTMLElement, className: string): boolean {
    if (
      element &&
      typeof element === "object" &&
      typeof className === "string" &&
      element.nodeType === 1
    ) {
      return element.classList.contains(className.trim());
    }
    return false;
  }

  /**
   * 添加样式
   *
   * @param element
   * @param className
   */
  public static addClass(element: HTMLElement, className: string): void {
    if (
      element &&
      typeof element === "object" &&
      typeof className === "string" &&
      element.nodeType === 1
    ) {
      className = className.trim();
      if (!DOMUtils.hasClass(element, className)) {
        const cl = element.className;
        element.className = cl ? cl + " " + className : className;
      }
    }
  }

  /**
   * 移除样式
   *
   * @param element
   * @param className
   */
  public static removeClass(element: HTMLElement, className: string): void {
    if (
      element &&
      typeof element === "object" &&
      typeof className === "string" &&
      element.nodeType === 1 &&
      typeof element.className === "string"
    ) {
      className = className.trim();
      const classes = element.className.trim().split(" ");
      for (let i = classes.length - 1; i >= 0; i--) {
        classes[i] = classes[i].trim();
        if (!classes[i] || classes[i] === className) {
          classes.splice(i, 1);
        }
      }
      element.className = classes.join(" ");
    }
  }

  /**
   * 切换样式
   *
   * @param element
   * @param className
   * @param force
   */
  public static toggleClass(
    element: HTMLElement,
    className: string,
    force?: boolean
  ): void {
    if (
      element &&
      typeof element === "object" &&
      typeof className === "string" &&
      element.nodeType === 1
    ) {
      element.classList.toggle(className, force);
    }
  }

  /**
   * 替换样式
   *
   * @param element
   * @param oldClassName
   * @param newClassName
   */
  public static replaceClass(
    element: HTMLElement,
    oldClassName: string,
    newClassName: string
  ): void {
    if (
      element &&
      typeof element === "object" &&
      typeof oldClassName === "string" &&
      typeof newClassName === "string" &&
      element.nodeType === 1
    ) {
      oldClassName = oldClassName.trim();
      newClassName = newClassName.trim();
      DOMUtils.removeClass(element, oldClassName);
      DOMUtils.addClass(element, newClassName);
    }
  }

  /**
   * 计算相对于中心点的旋转角度
   * @param element
   * @param event
   */
  static calcAngle(element: HTMLElement, event: MouseEvent) {
    const rect = element.getBoundingClientRect();

    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    //获得中心点和鼠标坐标连线，与y轴正半轴之间的夹角
    const x = Math.abs(originX - event.clientX);
    const y = Math.abs(originY - event.clientY);
    const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    const cos = y / z;
    const rad = Math.acos(cos); //用反三角函数求弧度
    let angle = Math.floor(180 / (Math.PI / rad)); //将弧度转换成角度

    if (event.clientX > originX && event.clientY > originY) {
      //鼠标在第四象限
      angle = 180 - angle;
    }

    if (event.clientX == originX && event.clientY > originY) {
      //鼠标在y轴负方向上
      angle = 180;
    }

    if (event.clientX > originX && event.clientY == originY) {
      //鼠标在x轴正方向上
      angle = 90;
    }

    if (event.clientX < originX && event.clientY > originY) {
      //鼠标在第三象限
      angle = 180 + angle;
    }

    if (event.clientX < originX && event.clientY == originY) {
      //鼠标在x轴负方向
      angle = 270;
    }

    if (event.clientX < originX && event.clientY < originY) {
      //鼠标在第二象限
      angle = 360 - angle;
    }

    return angle;
  }
}

export type Nullable<T> = T | null;

export interface DragEventOptions {
  drag?: (event: Event) => void;
  start?: (event: Event) => void;
  end?: (event: Event) => void;
}

export interface Dictionary<T> {
  [Key: string]: T;
}

export type DictionaryTyped<T extends string | number | symbol, T2> = {
  [Key in T]: T2;
};

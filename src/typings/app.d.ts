declare global {
  export type Nullable<T> = T | null;
  export type Indexed<T = any> = {
    [key in string]: T;
  };

  export type Keys<T extends Indexed<unknown>> = keyof T;
  export type Values<T extends Indexed<unknown>> = T[Keys<T>];

}



export {};

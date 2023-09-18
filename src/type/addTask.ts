import { MutableRefObject, SetStateAction, Dispatch } from "react";

export type propsAdd = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  postTask: () => void;
  updateTask: (id: string, value: string) => void;
  ref: MutableRefObject<any>;
  id: string;
  btn: boolean;
};

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

export type propsList = {
  loading: boolean;
  tasks: [];
  deleteTask: (id: string) => void;
  toggles: (title: string, id: string) => void;
};

export type propsTask = {
  id: string;
  title: string;
};

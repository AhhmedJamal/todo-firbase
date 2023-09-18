export type propsList = {
  loading: boolean;
  tasks: [];
  deleteTask: (id: string) => void;
  toggles: (title: string, id: string) => void;
};

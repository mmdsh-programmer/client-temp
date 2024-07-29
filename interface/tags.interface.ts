export interface ITag {
  id: number;
  name: string;
  createDate: number;
}

export interface ITags {
  list: ITag[];
  size: number;
  page: number;
  total: number;
}

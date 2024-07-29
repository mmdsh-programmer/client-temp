export interface IContentSearchListItem {
  versionId: number;
  versionName: string;
  repoId: number;
  repoName: string;
  documentId: number;
  documentName: string;
}

export interface IContentSearchResult {
  list: IContentSearchListItem[];
  offset: string;
  size: string;
  total: number;
}

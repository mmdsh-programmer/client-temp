export interface IOffer {
  id: number;
  entityId: number;
  data: {
    message: string;
    fileHash: string[];
  };
}

export interface IOfferResponse {
  list: IOffer[];
  total: number;
}

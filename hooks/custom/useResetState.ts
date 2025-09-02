import { useBulkStore } from "@store/bulk";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";
import { useRepositoryStore } from "@store/repository";
import { useVersionStore } from "@store/version";
import { useEffect } from "react";

export const useResetStates = () => {
  const { setRepo, setRepositoryId } = useRepositoryStore();
  const { setCategory, setCategoryShow } = useCategoryStore();
  const { setSelectedDocument, setDocumentShow } = useDocumentStore();
  const { setVersionModalList } = useVersionStore();
  const setBulkItems = useBulkStore((s) => {
    return s.setBulkItems;
  });

  useEffect(() => {
    setRepo(null);
    setRepositoryId(null);
    setCategory(null);
    setCategoryShow(null);
    setSelectedDocument(null);
    setDocumentShow(null);
    setVersionModalList(false);
    setBulkItems([]);
  }, []);
};

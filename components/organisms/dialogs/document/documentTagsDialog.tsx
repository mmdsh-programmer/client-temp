import {
 selectedDocumentAtom,
 tempDocTagAtom
} from "@atom/document";
import {
 useRecoilState,
 useRecoilValue
} from "recoil";

import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import DocumentTagList from "@components/organisms/document/documentTagList";
import React from "react";
import SearchableDropdown from "@components/molecules/searchableDropdown";
import { Spinner } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useEditDocument from "@hooks/document/useEditDocument";
import useGetTags from "@hooks/tag/useGetTags";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentAccessDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const [getTempDocTag, setTempDocTag] = useRecoilState(tempDocTagAtom);

  const repoId = getRepo!.id;
  const adminRole =
    getRepo?.roleName === "owner" || getRepo?.roleName === "admin";

  const {
 data: getTags, isLoading 
} = useGetTags(repoId, 30, true);

  const editDocument = useEditDocument();

  const updatedAvailableTags = getTags?.pages[0].list
    .filter((repoTag) => {
      return getTempDocTag.every((tag) => {
        return tag !== +repoTag.id;
      });
    })
    .map((tag) => {
      return {
        label: tag.name,
        value: tag.id,
      };
    });

  const documentTags = getTags?.pages[0].list.filter((repoTag) => {
    return getTempDocTag.includes(+repoTag.id);
  });

  const handleClose = () => {
    setOpen(false);
    setTempDocTag([]);
  };

  const handleSubmit = async () => {
    if (!getRepo || !document) return;
    if (!getTempDocTag) return;
    editDocument.mutate({
      repoId: getRepo.id,
      documentId: document.id,
      categoryId: document.categoryId,
      title: document.name,
      contentType: document.contentType,
      tagIds: getTempDocTag,
      callBack: () => {
        toast.success("تگ‌ها با موفقیت به سند اضافه شدند.");
      },
    });
  };

  return (
    <ConfirmFullHeightDialog
      dialogHeader="تگ‌های سند"
      setOpen={handleClose}
      className="min-h-[350px]"
      isPending={editDocument.isPending}
      onSubmit={handleSubmit}
    >
      <form className="flex flex-col gap-5">
        {isLoading ? (
          <Spinner className="h-5 w-5" color="deep-purple" />
        ) : (
          adminRole && (
            <div className="flex gap-2">
              <div className="flex-grow">
                <SearchableDropdown
                  options={updatedAvailableTags}
                  handleChange={(val) => {
                    return setTempDocTag((oldValue) => {
                      const newValue = new Set([...oldValue, +val.value]);
                      return Array.from(newValue);
                    });
                  }}
                />
              </div>
            </div>
          )
        )}
        <DocumentTagList tagList={documentTags} />
      </form>
    </ConfirmFullHeightDialog>
  );
};

export default DocumentAccessDialog;

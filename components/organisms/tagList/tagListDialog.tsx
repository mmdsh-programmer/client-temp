import React from "react";
import { repoAtom } from "@atom/repository";
import useGetTags from "@hooks/tag/useGetTags";
import {
  Spinner,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { useRecoilState, useRecoilValue } from "recoil";
import ChipMolecule from "@components/molecules/chip";
import Text from "@components/atoms/typograghy/text";
import TagMenu from "./tagMenu";
import Title from "@components/atoms/typograghy/title";
import CloseButton from "@components/atoms/button/closeButton";
import BackButton from "@components/atoms/button/backButton";
import { deleteTagAtom, editTagAtom } from "@atom/tag";
import TagDelete from "../dialogs/tag/tagDeleteDialog";
import TagEdit from "../dialogs/tag/tagEditDialog";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TagListDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const repoId = getRepo!.id;
  const [getEditTagModal, setEditTagModal] = useRecoilState(editTagAtom);
  const [getDeleteTagModal, setDeleteTagModal] = useRecoilState(deleteTagAtom);
  const { data: getTags, isLoading, isFetching } = useGetTags(repoId, 30, true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        placeholder=""
        size="sm"
        open={true}
        handler={handleClose}
        className={` flex flex-col !h-full w-full max-w-full xs:!h-auto xs:min-w-[400px] xs:max-w-[400px] bg-primary rounded-none xs:rounded-lg `}
      >
        <DialogHeader
          placeholder="dialog header"
          className="flex items-center xs:justify-between gap-[10px] xs:gap-0 px-[6px] xs:px-6 py-[6px] xs:py-5 border-b-none xs:border-b-[0.5px] border-normal"
        >
          <div className="block xs:hidden">
            <BackButton onClick={handleClose} />
          </div>
          <Title>لیست تگ‌ها</Title>
          <div className="hidden xs:block">
            <CloseButton onClose={handleClose} />
          </div>
        </DialogHeader>
        <div className="block xs:hidden h-2 w-full bg-secondary" />
        <DialogBody placeholder="dialog body" className="p-0 h-full">
          <div className="px-5 py-3 xs:p-6">
            {isLoading || isFetching ? (
              <div className="flex h-full w-full items-center justify-center">
                <Spinner color="purple" className="" />
              </div>
            ) : (
              <>
                <div className="hidden xs:flex flex-wrap gap-2">
                  <div>
                    <ChipMolecule
                      value="افزودن تگ"
                      className="border-[1px] h-6 px-2 border-dashed border-normal bg-primary text-placeholder"
                    />
                  </div>
                  {getTags?.pages.map((page) => {
                    return page.list.map((tag) => {
                      return (
                        <div key={tag.id}>
                          <ChipMolecule
                            value={tag.name}
                            key={tag.id}
                            className="bg-gray-50 h-6 px-2 text-primary max-w-[150px]"
                            icon={<TagMenu tag={tag} />}
                          />
                        </div>
                      );
                    });
                  })}
                </div>
                <div className="xs:hidden flex flex-col h-full justify-between">
                  <ul className="flex flex-col gap-y-2">
                    {getTags?.pages.map((page) => {
                      return page.list.map((tag) => {
                        return (
                          <li
                            key={tag.id}
                            className="flex py-1 px-2 rounded-lg justify-between items-center  hover:bg-gray-50"
                          >
                            <Text className="text-primary text-sm cursor-default lowercase font-light">
                              {tag.name}
                            </Text>
                            <TagMenu tag={tag} />
                          </li>
                        );
                      });
                    })}
                  </ul>
                  <div className="self-end">create</div>
                </div>
              </>
            )}
          </div>
        </DialogBody>
        <TagMenu showDrawer={true} />
        {getEditTagModal && <TagEdit setOpen={setEditTagModal} />}
        {getDeleteTagModal && <TagDelete setOpen={setDeleteTagModal} />}
      </Dialog>
    </>
  );
};

export default TagListDialog;

import React, { useState } from "react";
import { repoAtom } from "@atom/repository";
import useGetTags from "@hooks/tag/useGetTags";
import {
  Spinner,
  DialogBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useRecoilState, useRecoilValue } from "recoil";
import ChipMolecule from "@components/molecules/chip";
import { deleteTagAtom, editTagAtom } from "@atom/tag";
import TagCreateDialog from "../dialogs/tag/tagCreateDialog";
import TagEditDialog from "../dialogs/tag/tagEditDialog";
import TagDeleteDialog from "../dialogs/tag/tagDeleteDialog";
import TagMenu from "@components/molecules/tagMenu/tagMenu";
import InfoDialog from "@components/templates/dialog/infoDialog";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TagListDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const repoId = getRepo?.id!;
  const [getEditTagModal, setEditTagModal] = useRecoilState(editTagAtom);
  const [getDeleteTagModal, setDeleteTagModal] = useRecoilState(deleteTagAtom);

  const [openTagCreateModal, setOpenTagCreateModal] = useState(false);

  const { data: getTags, isLoading, isFetching } = useGetTags(repoId, 20, true);

  const handleClose = () => {
    setOpen(false);
  };

  const adminRole =
    getRepo?.roleName === "owner" || getRepo?.roleName === "admin";

  return (
    <>
      {openTagCreateModal ? (
        <TagCreateDialog setOpen={setOpenTagCreateModal} />
      ) : getEditTagModal ? (
        <TagEditDialog setOpen={setEditTagModal} />
      ) : getDeleteTagModal ? (
        <TagDeleteDialog setOpen={setDeleteTagModal} />
      ) : (
        <InfoDialog dialogHeader="لیست تگ‌ها" setOpen={handleClose}>
          <DialogBody placeholder="dialog body" className="p-0 h-full">
            <div className="h-full px-5 py-3 xs:p-6">
              {isLoading ? (
                <div className="flex h-full w-full items-center justify-center">
                  <Spinner color="purple" className="" />
                </div>
              ) : (
                <>
                  <div className="hidden xs:flex flex-wrap gap-2">
                    <div
                      onClick={() => {
                        setOpenTagCreateModal(true);
                      }}
                    >
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
                              actionIcon={adminRole ? <TagMenu tag={tag} /> : null}
                            />
                          </div>
                        );
                      });
                    })}
                  </div>
                  <div className="xs:hidden flex flex-col h-full justify-between">
                    <ul className="h-full flex flex-col gap-y-2">
                      {getTags?.pages.map((page) => {
                        return page.list.map((tag) => {
                          return (
                            <li
                              key={tag.id}
                              className="flex py-1 px-2 rounded-lg justify-between items-center  hover:bg-gray-50"
                            >
                              <Typography className="label_l2 text-primary cursor-default lowercase">
                                {tag.name}
                              </Typography>
                              {adminRole ? <TagMenu tag={tag} /> : null}
                            </li>
                          );
                        });
                      })}
                    </ul>
                    <div className="w-full self-end">
                      <Button
                        className="w-full bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
                        onClick={() => {
                          setOpenTagCreateModal(true);
                        }}
                      >
                        <Typography className="text__label__button text-white">
                          افزودن تگ
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </DialogBody>
          <TagMenu showDrawer={true} />
        </InfoDialog>
      )}
    </>
  );
};

export default TagListDialog;

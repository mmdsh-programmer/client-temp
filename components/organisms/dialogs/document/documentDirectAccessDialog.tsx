import { DialogBody, Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import React, { useState } from "react";
import SelectAtom, { IOption } from "@components/molecules/select";

import DocumentAccessList from "@components/organisms/document/documentAccessList";
import { ERoles } from "@interface/enums";
import InfoDialog from "@components/templates/dialog/infoDialog";
import InputAtom from "@components/atoms/input";
import LoadingButton from "@components/molecules/loadingButton";
import { documentDirectAccessSchema } from "./validation.yup";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import { translateRoles } from "@utils/index";
import useAddAccessToResource from "@hooks/accessManagement/useAddAccessToResource";
import { useForm } from "react-hook-form";
import useGetRoles from "@hooks/user/useGetRoles";
import { useRecoilValue } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  username: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentDirectAccessDialog = ({ setOpen }: IProps) => {
  const [role, setRole] = useState<IOption>({
    label: translateRoles(ERoles.admin),
    value: ERoles.admin,
  });
  const document = useRecoilValue(selectedDocumentAtom);

  const { data: getRoles, isFetching: isFetchingRoles } = useGetRoles();
  const directAccessDocument = useAddAccessToResource();

  const rolesOption = getRoles
    ?.filter((roleItem) => {
      return roleItem.name !== ERoles.owner && roleItem.name !== ERoles.default;
    })
    .map((item) => {
      return { label: translateRoles(item.name), value: item.name };
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(documentDirectAccessSchema),
  });

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!document) return;
    directAccessDocument.mutate({
      resourceId: document.id,
      accessNames: [role.value as string],
      username: dataForm.username,
      cascadeToChildren: true,
      callBack: () => {
        toast.success("دسترسی کاربر به سند انجام شد.");
        reset();
        setRole({
          label: translateRoles(ERoles.admin),
          value: ERoles.admin,
        });
      },
    });
  };

  return (
    <InfoDialog
      dialogHeader="دسترسی مستقیم روی سند"
      setOpen={handleClose}
      className="document-direct-access-dialog min-h-[350px]"
    >
      <DialogBody>
        <form className="direct-access-form flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 !h-12 pr-3 pl-2 !bg-gray-50 border-[1px] !border-normal rounded-lg">
              <InputAtom
                id="username"
                className="direct-access-form__username  !w-auto h-auto overflow-hidden !p-0 border-none"
                placeholder="شناسه پادی"
                register={{ ...register("username") }}
              />
              {isFetchingRoles ? (
                <Spinner className="h-3 w-3 text-primary" />
              ) : (
                <SelectAtom
                  className="direct-access-form__role w-auto"
                  defaultOption={rolesOption?.[0]}
                  options={rolesOption}
                  selectedOption={role}
                  setSelectedOption={(value) => {
                    return setRole({
                      label: value.label,
                      value: value.value,
                    });
                  }}
                />
              )}
              <LoadingButton
                loading={directAccessDocument.isPending}
                onClick={handleSubmit(onSubmit)}
                className="direct-access-form__add !h-8 !bg-white px-3 !rounded-sm shadow-none hover:shadow-none hover:bg-white"
              >
                <Typography className="text__label__button !text-primary_normal font-medium">
                  افزودن
                </Typography>
              </LoadingButton>
            </div>
            {errors.username ? (
              <Typography className="warning_text">
                {errors.username?.message}
              </Typography>
            ) : null}
          </div>
          <DocumentAccessList />
        </form>
      </DialogBody>
    </InfoDialog>
  );
};

export default DocumentDirectAccessDialog;

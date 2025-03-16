import { addPartyToDomainParticipantsAction } from "@actions/domain";
import { IActionError } from "@interface/app.interface";
import { useMutation } from "@tanstack/react-query";
import { handleClientSideHookError } from "@utils/error";
import { toast } from "react-toastify";

interface IUseAddPartyToDomainProps {
  userNameList: string[];
  callBack?: () => void;
}

const useAddPartyToDomain = () => {
  return useMutation({
    mutationKey: ["addPartyToDomain"],
    mutationFn: async (values: IUseAddPartyToDomainProps) => {
      const { userNameList } = values;
      const response = await addPartyToDomainParticipantsAction(userNameList);
      handleClientSideHookError(response as IActionError);
      return response;
    },
    onSuccess: (response, values) => {
      const { callBack } = values;

      callBack?.();
      toast.success("کاربر با موفقیت به دامنه اضافه شد");
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطا در افزودن کاربر به دامنه");
    },
  });
};

export default useAddPartyToDomain;

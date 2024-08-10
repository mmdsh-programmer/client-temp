import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRecoilValue } from "recoil";
import useGetRepoUsers from "@hooks/user/useGetRepoUsers";
import { repoAtom } from "@atom/repository";
import { translateRoles } from "@utils/index";
import { Typography } from "@material-tailwind/react";
import LoadingButton from "@components/molecules/loadingButton";

export interface IUsers {
  userName: string;
  picture: string;
}

interface IProps {
  onAdd: (user: IUsers) => void;
  updatedUsers: { id: string; userName: string; picture?: string }[];
}

const AddUsers = (props: IProps) => {
  const { onAdd, updatedUsers } = props;
  const getRepo = useRecoilValue(repoAtom);
  const { data: getUsers, isLoading } = useGetRepoUsers(getRepo?.id, 10, true);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const { control, reset, handleSubmit } = useForm<IUsers>({
    defaultValues: {
      userName: "",
    },
  });

  const clear = () => {
    return reset();
  };

  const handleChange = () => {};

  const filteredUsers = getUsers?.pages.map((userPage) => {
    return userPage?.list.filter((user) => {
      return !updatedUsers.some(
        (filteredUser: { id: string; userName: string; picture?: string }) => {
          return filteredUser.userName === user.userInfo.userName;
        }
      );
    });
  });
  // .map((item) => {
  //   return item.map((user) => {
  //     return [
  //       {
  //         label: `${user.userInfo.userName} - ${translateRoles(user.userRole)}`,
  //         value: user.userInfo.userName,
  //       },
  //     ];
  //   });
  // });

  const handleAdd = handleSubmit((dataForm: IUsers) => {
    onAdd(dataForm);
    clear();
  });

  return (
    <div>
      {isLoading ? (
        <div className="spinner " />
      ) : (
        <div className="flex gap-2 w-full max-h-10 h-10">
          {getUsers && (
            <Controller
              name="userName"
              control={control}
              rules={{
                required: "Required",
              }}
              render={({ field: { onChange, ...field } }) => {
                return (
                  <select
                    {...field}
                    className="body_b3 text-placeholder w-full h-12 bg-gray-50 font-iranYekan border-[1px] border-normal rounded-lg outline-none"
                    placeholder="جستجوی نام کاربر"
                    onChange={(e) => {
                      onChange(e.target.value);
                      setSelectedUser(e.target.value);
                    }}
                  >
                    <option disabled={!!selectedUser} >
                      نام کاربری
                    </option>
                    {filteredUsers?.map((item) => {
                      return item.map((user) => {
                        return (
                          user.userRole !== "owner" && (
                            <option
                              key={user.userInfo.userName}
                              value={user.userInfo.userName}
                            >
                              {user.userInfo.userName} -{" "}
                              {translateRoles(user.userRole)}
                            </option>
                          )
                        );
                      });
                    })}
                  </select>

                  //   <SelectAtom
                  //     defaultOption="نام کاربری"
                  //     options={filteredUsers}
                  //     setSelectedOption={handleChange}
                  //     className=""
                  //     selectedOption={selectedUser}
                  //   />
                );
              }}
            />
          )}
          <LoadingButton
            className="!h-12 bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
            onClick={() => {
              handleAdd();
              setSelectedUser(null);
            }}
            // disabled={selectedUser}
          >
            <Typography className="text__label__button text-white">
              افزودن
            </Typography>
          </LoadingButton>
        </div>
      )}
    </div>
  );
};

export default AddUsers;

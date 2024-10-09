import React, { useState } from "react";
import {
  ConfirmationVersionIcon,
  GlobeIcon,
  ListIcon,
  SpeedDialIcon,
} from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import { EDraftStatus } from "@interface/enums";
import { IVersion } from "@interface/version.interface";
import LikeAndComment from "../like&comment";
import RenderIf from "@components/atoms/renderIf";
import VersionConfirmDialog from "../dialogs/version/versionConfirmDialog";
import VersionPublicDialog from "../dialogs/version/versionPublicDialog";
import { useRecoilState } from "recoil";
import { editorListDrawerAtom } from "@atom/editor";

interface IProps {
  version?: IVersion;
}

const FloatingButtons = ({ version }: IProps) => {
  const [getListDrawer, setListDrawer] = useRecoilState(editorListDrawerAtom);

  const [versionConfirmModal, setVersionConfirmModal] = useState(false);
  const [versionPublicModal, setVersionPublicModal] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  const renderLike =
    version?.state !== "draft" && version?.status === "accepted";

  const renderAcceptVersion =
    version?.state === "draft" &&
    version.status !== EDraftStatus.rejected &&
    version.status !== EDraftStatus.pending;

  const renderPublicVersion =
    version?.state === "version" &&
    version.status !== EDraftStatus.rejected &&
    version.status !== EDraftStatus.accepted &&
    version.status !== EDraftStatus.pending;

  return (
    <>
      <div
        className={`${getListDrawer ? "right-[3%] sm:right-[310px]" : "right-[3%]"} bottom-[20px] absolute p-2 flex items-center gap-2 rounded-full shadow-xl bg-[#222]`}
      >
        <Button
          className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700"
          onClick={() => {
            setOpenSpeedDial(!openSpeedDial);
          }}
        >
          <SpeedDialIcon className="h-4 w-4" />
        </Button>
        {openSpeedDial ? (
          <>
            <Button
              className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700"
              onClick={() => {
                setListDrawer(!getListDrawer);
              }}
            >
              <ListIcon className="h-5 w-5" />
            </Button>
            <RenderIf isTrue={renderAcceptVersion}>
              <Button
                className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700"
                onClick={() => {
                  setVersionConfirmModal(true);
                }}
              >
                <ConfirmationVersionIcon className="h-4 w-4 fill-white" />
              </Button>
            </RenderIf>
            <RenderIf isTrue={renderPublicVersion}>
              <Button
                className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700"
                onClick={() => {
                  setVersionPublicModal(true);
                }}
              >
                <GlobeIcon className="h-5 w-5 fill-white" />
              </Button>
            </RenderIf>
            <RenderIf isTrue={renderLike}>
              <LikeAndComment version={version} />
            </RenderIf>
          </>
        ) : null}
      </div>
      {versionConfirmModal && version ? (
        <VersionConfirmDialog
          version={version}
          setOpen={() => {
            return setVersionConfirmModal(false);
          }}
        />
      ) : null}
      {versionPublicModal && version ? (
        <VersionPublicDialog
          version={version}
          setOpen={() => {
            return setVersionPublicModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default FloatingButtons;

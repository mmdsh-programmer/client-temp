import React, { useState } from "react";
import {
  ConfirmationVersionIcon,
  DislikeIcon,
  GlobeIcon,
  LikeIcon,
} from "@components/atoms/icons";
import RenderIf from "@components/atoms/renderIf";
import { EDraftStatus } from "@interface/enums";
import { Button } from "@material-tailwind/react";
import VersionConfirmDialog from "../dialogs/version/versionConfirmDialog";
import VersionPublicDialog from "../dialogs/version/versionPublicDialog";
import { IVersion } from "@interface/version.interface";
import LikeAndComment from "../like&comment";

interface IProps {
  version?: IVersion;
}

const FloatingButtons = ({ version }: IProps) => {
  const [versionConfirmModal, setVersionConfirmModal] = useState(false);
  const [versionPublicModal, setVersionPublicModal] = useState(false);

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
      <div className="absolute bottom-[5px] xs:bottom-[30px] right-[33%] xs:right-[50%] p-2 flex items-center gap-2 rounded-full shadow-xl bg-[#222]">
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
          <LikeAndComment />
        </RenderIf>
      </div>
      {versionConfirmModal && version ? (
        <VersionConfirmDialog
          version={version}
          setOpen={() => setVersionConfirmModal(false)}
        />
      ) : null}

      {versionPublicModal && version ? (
        <VersionPublicDialog
          version={version}
          setOpen={() => setVersionPublicModal(false)}
        />
      ) : null}
    </>
  );
};

export default FloatingButtons;

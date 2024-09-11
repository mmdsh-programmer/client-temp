import {
  documentInfoAtom,
  documentKeyAtom,
  documentTemplateAtom,
  documentTypeAtom,
} from "@atom/document";
import { useRecoilState, useSetRecoilState } from "recoil";

import { EDocumentTypes } from "@interface/enums";
import { documentActiveStepAtom } from "@atom/stepper";

const useStepperNavigate = () => {
  const setActiveStep = useSetRecoilState(documentActiveStepAtom);
  const setDocumentInfo = useSetRecoilState(documentInfoAtom);
  const setDocumentTemplate = useSetRecoilState(documentTemplateAtom);
  const setDocumentKey = useSetRecoilState(documentKeyAtom);
  const [getDocumentType, setDocumentType] = useRecoilState(documentTypeAtom);

  const handleNextStep = () => {
    return setActiveStep((cur) => {
      if (cur === 1 && !getDocumentType?.includes(EDocumentTypes.classic))
        return cur + 2;
      return cur + 1;
    });
  };

  const handlePrevStep = () => {
    return setActiveStep((cur) => {
      if (cur === 3 && !getDocumentType?.includes(EDocumentTypes.classic))
        return cur - 2;
      return cur - 1;
    });
  };

  const goToFirstStep = () => {
    setActiveStep(0);
  };

  const close = () => {
    setActiveStep(0);
    setDocumentType(null);
    setDocumentInfo(null);
    setDocumentTemplate(null);
    setDocumentKey(null);
  };

  return { handleNextStep, handlePrevStep, goToFirstStep, close };
};

export default useStepperNavigate;

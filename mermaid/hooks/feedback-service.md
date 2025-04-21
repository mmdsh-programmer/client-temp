```mermaid
%% Feedback Service
%% This diagram shows all hooks related to feedback functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class ISendFeedbackInput {
        +content: string
        +fileHashList: IFeedbackFileHash[]
        +callBack?: () => void
    }
    
    %% Helper Interfaces
    class IFeedbackFileHash {
        +hash: string
        +fileName: string
        +fileExtension: string
    }

    %% Hooks
    class SendFeedbackHook {
        Input: ISendFeedbackInput
        Output: void
        +useSendFeedback()
    }

    class AddUserToFeedbackGroupHashHook {
        Input: callBack?: () => void
        Output: void
        +useAddUserToFeedbackGroupHash()
    }

    %% Relationships
    SendFeedbackHook --> ISendFeedbackInput : accepts
    ISendFeedbackInput --> IFeedbackFileHash : contains
``` 
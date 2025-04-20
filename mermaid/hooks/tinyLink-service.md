```mermaid
%% TinyLink Service
%% This diagram shows all hooks related to tiny link functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
direction TB
    %% Input Interfaces
    class ICreateTinyLinkInput {
        +url: string
        +callBack?: (result: ITinyLinkResult) => void
    }
    
    %% Output Interfaces
    class ITinyLinkResult {
        +urlOrContent: string
        +hash: string
        +visitCount: number
        +shortenObjectKind: string
    }
    
    class ITinyActionError {
        +code: number
        +developerMessage: string
        +error: boolean
        +message: string
        +result: ITinyLinkResult | null
    }
    
    %% Hooks
    class CreateTinyLinkHook {
        <<hook>>
        Input: ICreateTinyLinkInput
        Output: ITinyLinkResult
        +useCreateTinyLink()
    }
    
    %% Relationships
    ITinyActionError --> ITinyLinkResult : contains
    
    CreateTinyLinkHook --> ICreateTinyLinkInput : accepts
    CreateTinyLinkHook --> ITinyLinkResult : returns
``` 
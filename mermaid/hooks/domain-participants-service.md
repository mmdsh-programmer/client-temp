 ```mermaid
%% Domain Participants Service
%% This diagram shows all hooks related to domain participants functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class IAddPartyToDomainInput {
        +userNameList: string
        +callBack?: () => void
    }

    class IRemovePartyFromDomainInput {
        +userNameList: string[]
        +callBack?: () => void
    }

    %% Hooks
    class AddPartyToDomainHook {
        Input: IAddPartyToDomainInput
        Output: void
        +useAddPartyToDomain()
    }

    class RemovePartyFromDomainHook {
        Input: IRemovePartyFromDomainInput
        Output: void
        +useRemovePartyFromDomain()
    }

    %% Relationships
    AddPartyToDomainHook --> IAddPartyToDomainInput : accepts
    RemovePartyFromDomainHook --> IRemovePartyFromDomainInput : accepts
```
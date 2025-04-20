```mermaid
%% Domain Tags Service
%% This diagram shows all hooks related to domain tags functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class ICreateDomainTagInput {
        +name: string
        +description: string
        +order: number
        +callBack?: () => void
    }

    class IEditDomainTagInput {
        +tagId: number
        +name: string
        +description: string
        +order: number
        +callBack?: () => void
    }

    class IDeleteDomainTagInput {
        +tagId: number
        +callBack?: () => void
    }

    class ISetDocumentDomainTagsInput {
        +repoId: number
        +documentId: number
        +tagIds: number[]
        +isDirectAccess?: boolean
        +callBack?: () => void
    }
    
    %% Output Interfaces
    class IDomainTag {
        +id: number
        +name: string
        +description: string
        +parentId: number | null
        +domainId: number
        +domainUrl: string
        +domainEntityId: number
        +createdAt: string
        +updatedAt?: string
        +order: number
    }

    %% Hooks
    class GetDomainTagsHook {
        Input: size: number
        Output: IDomainTag[]
        +useGetDomainTags()
    }

    class GetDomainTagByIdHook {
        Input: tagId: number
        Output: IDomainTag
        +useGetDomainTagById()
    }

    class CreateDomainTagHook {
        Input: ICreateDomainTagInput
        Output: void
        +useCreateDomainTag()
    }

    class EditDomainTagHook {
        Input: IEditDomainTagInput
        Output: void
        +useEditDomainTag()
    }

    class DeleteDomainTagHook {
        Input: IDeleteDomainTagInput
        Output: void
        +useDeleteDomainTag()
    }

    class SetDocumentDomainTagsHook {
        Input: ISetDocumentDomainTagsInput
        Output: void
        +useSetDocumentDomainTags()
    }

    %% Relationships
    GetDomainTagsHook --> IDomainTag : returns
    GetDomainTagByIdHook --> IDomainTag : returns
    CreateDomainTagHook --> ICreateDomainTagInput : accepts
    EditDomainTagHook --> IEditDomainTagInput : accepts
    DeleteDomainTagHook --> IDeleteDomainTagInput : accepts
    SetDocumentDomainTagsHook --> ISetDocumentDomainTagsInput : accepts
``` 
```mermaid
%% Tag Service
%% This diagram shows all hooks related to repository tag functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
direction TB
    %% Input Interfaces
    class IGetTagsInput {
        +repoId: number
        +isDirectAccess: boolean | undefined
        +size: number
    }
    
    class ICreateTagInput {
        +repoId: number
        +name: string
        +isDirectAccess?: boolean
        +callBack?: () => void
    }
    
    class IEditTagInput {
        +repoId: number
        +tagId: number
        +name: string
        +isDirectAccess?: boolean
        +callBack?: () => void
    }
    
    class IDeleteTagInput {
        +repoId: number
        +tagId: number
        +isDirectAccess?: boolean
        +callBack?: () => void
    }
    
    %% Output Interfaces
    class ITag {
        +id: number
        +name: string
        +createDate: number
    }
    
    class IListResponse~ITag~ {
        +list: ITag[]
        +offset: number
        +size: number
        +total: number
    }
    
    %% Hooks
    class GetTagsHook {
        <<hook>>
        Input: IGetTagsInput
        Output: IListResponse~ITag~
        +useGetTags()
    }
    
    class CreateTagHook {
        <<hook>>
        Input: ICreateTagInput
        Output: void
        +useCreateTag()
    }
    
    class EditTagHook {
        <<hook>>
        Input: IEditTagInput
        Output: void
        +useEditTag()
    }
    
    class DeleteTagHook {
        <<hook>>
        Input: IDeleteTagInput
        Output: void
        +useDeleteTag()
    }
    
    %% Relationships
    IListResponse~ITag~ --> ITag : contains
    
    GetTagsHook --> IGetTagsInput : accepts
    GetTagsHook --> IListResponse~ITag~ : returns
    
    CreateTagHook --> ICreateTagInput : accepts
    
    EditTagHook --> IEditTagInput : accepts
    
    DeleteTagHook --> IDeleteTagInput : accepts
``` 
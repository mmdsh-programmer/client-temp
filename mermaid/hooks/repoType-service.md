```mermaid
%% RepoType Service
%% This diagram shows all hooks related to repository type functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
direction TB
    %% Input Interfaces

    class ICreateRepoTypeInput {
        +name: string
        +username?: boolean
        +callBack?: () => void
    }
    
    class IDeleteRepoTypeInput {
        +branchId: number
        +callBack?: () => void
    }
    
    %% Output Interfaces
    class IRepoType {
        +id: number
        +resourceType?: string
        +type: string
        +name: string
        +businessId: number
        +createdAt: number
        +updateAt: number
    }
    
    %% Hooks
    class GetRepoTypesHook {
        <<hook>>
        Input
        Output: IRepoType[]
        +useGetRepoTypes()
    }
    
    class CreateRepoTypeHook {
        <<hook>>
        Input: ICreateRepoTypeInput
        Output: void
        +useCreateRepoType()
    }
    
    class DeleteRepoTypeHook {
        <<hook>>
        Input: IDeleteRepoTypeInput
        Output: void
        +useDeleteRepoType()
    }
    
    %% Relationships
    GetRepoTypesHook --> IRepoType : returns
    
    CreateRepoTypeHook --> ICreateRepoTypeInput : accepts
    
    DeleteRepoTypeHook --> IDeleteRepoTypeInput : accepts
``` 
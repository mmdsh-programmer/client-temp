```mermaid
%% Public Service
%% This diagram shows all hooks related to public functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class ISubscribeRepoInput {
        +hash: string
        +password?: string
        +callBack?: (result) => void
        +errorCallBack?: (error?: number) => void
    }

    class ICreatePublicLinkInput {
        +repoId: number
        +roleId: number
        +expireTime?: number
        +password?: string
        +callBack?: (result) => void
    }

    class IDeletePublicLinkInput {
        +repoId: number
        +roleId: number
        +callBack?: (roleName?: string) => void
    }
    
    %% Output Interfaces
    class ISubscribeResult {
        +repository: IRepo
    }
    
    class IRepo {
        +id: number
        +name: string
        +description: string
        +bookmark: boolean
        +createDate: string
        +lastAccessDate: string
        +imageFileHash: string
        +roleName: ERoles
        +updatedAt: string
        +userGroupHash: string
        +chatThreadId?: number
        +owner?: IRepoOwner
        +unreadCount?: number
        +isPublish: boolean
        +isArchived: boolean
        +publishExpireTime: number
        +adminPublicLink: IPublicLink
        +viewerPublicLink: IPublicLink
        +writerPublicLink: IPublicLink
        +editorPublicLink: IPublicLink
        +metadata?: null
    }
    
    class IRepoOwner {
        +userName: string
        +name: string
        +ssoId: number
        +img: string
    }
    
    class IPublicLink {
        +hasPassword: boolean
        +expireTime: number
        +link: string
    }

    %% Hooks
    class SubscribeRepoHook {
        Input: ISubscribeRepoInput
        Output: ISubscribeResult
        +useSubscribeRepo()
    }

    class CreatePublicLinkHook {
        Input: ICreatePublicLinkInput
        Output: void
        +useCreatePublicLink()
    }

    class DeletePublicLinkHook {
        Input: IDeletePublicLinkInput
        Output: void
        +useDeletePublicLink()
    }

    %% Relationships
    SubscribeRepoHook --> ISubscribeRepoInput : accepts
    SubscribeRepoHook --> ISubscribeResult : returns
    CreatePublicLinkHook --> ICreatePublicLinkInput : accepts
    DeletePublicLinkHook --> IDeletePublicLinkInput : accepts
    ISubscribeResult --> IRepo : contains
    IRepo --> IRepoOwner : contains
    IRepo --> IPublicLink : contains
``` 
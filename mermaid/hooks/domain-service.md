```mermaid
%% Domain Service
%% This diagram shows all hooks related to domain functionality

---
config:
  look: neo
  theme: default
  layout: elk
---
classDiagram
direction TB
    %% Output Interfaces
    class IDomainMetadata {
        +id: number
        +domain: string
        +clientId: string
        +types: string[]
        +clientSecret: string
        +CUSTOM_POST_TYPE: "DOMAIN_BUSINESS"
        +entityId: number
        +content: string
        +cryptoInitVectorKey: string
        +cryptoSecretKey: string
        +enablePublishPage: false
        +participants: IDomainParticipant[]
        +useDomainTag: boolean
    }

    class IDomainParticipant {
        +ssoId: number
        +userName: string
        +name: string
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
        +adminPublicLink: IPublicLink | null
        +viewerPublicLink: IPublicLink | null
        +writerPublicLink: IPublicLink | null
        +editorPublicLink: IPublicLink | null
        +metadata?: null
    }

    class IRepoOwner {
        +userName: string
        +name: string
        +ssoId: number
        +img: string
    }

    class IPublicLink {
        +hasPassword: boolean | null
        +expireTime: number
        +link: string
    }

    %% Hooks
    class GetDomainInfoHook {
        Input: -
        Output: IDomainMetadata
        +useGetDomainInfo()
    }

    class GetDomainPublishRepoListHook {
        Input: size: number
        Output: IRepo[]
        +useGetDomainPublishRepoList()
    }

    %% Relationships
    GetDomainInfoHook --> IDomainMetadata : returns
    GetDomainPublishRepoListHook --> IRepo : returns
    IDomainMetadata --> IDomainParticipant : contains
    IRepo --> IRepoOwner : contains
    IRepo --> IPublicLink : contains
```

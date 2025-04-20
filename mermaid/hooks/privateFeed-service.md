```mermaid
%% PrivateFeed Service
%% This diagram shows all hooks related to privateFeed functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class ICreatePrivateFeedInput {
        +repoId: number
        +name: string
        +content: string
        +link?: string
        +image?: string
        +callBack?: () => void
    }

    class IUpdatePrivateFeedInput {
        +repoId: number
        +feedId: number
        +name: string
        +content: string
        +link?: string
        +image?: string
        +callBack?: () => void
    }

    class IDeletePrivateFeedInput {
        +repoId: number
        +feedId: number
        +callBack?: () => void
    }
    
    %% Output Interfaces
    class IFeedItem {
        +id: number
        +imageUrl?: string
        +link: string
        +version: number
        +timelineId: number
        +entityId: number
        +forwardedId: number
        +numOfLikes: number
        +numOfDisLikes: number
        +numOfSaved: number
        +numOfShare: number
        +numOfFavorites: number
        +numOfComments: number
        +timestamp: number
        +enable: boolean
        +hide: boolean
        +replyPostConfirmation: boolean
        +userSrv: IUserSrv
        +rate: IRate
        +userPostInfo: IUserPostInfo
        +latitude: number
        +longitude: number
        +canComment: boolean
        +canLike: boolean
        +canRate: boolean
        +tags: number[]
        +tagTrees: number[]
        +name: string
        +content: string
        +pin: boolean
        +metadata: string
    }
    
    class IUserSrv {
        +id: number
        +name: string
        +ssoId: string
        +ssoIssuerCode: number
    }
    
    class IRate {
        +myRate: number
        +rate: number
        +rateCount: number
    }
    
    class IUserPostInfo {
        +postId: number
        +liked: boolean
        +disliked: boolean
        +favorite: boolean
        +saved: boolean
    }

    %% Hooks
    class GetPrivateFeedsHook {
        Input: size: number
        Output: IFeedItem[]
        +useGetPrivateFeeds()
    }

    class CreatePrivateFeedHook {
        Input: ICreatePrivateFeedInput
        Output: void
        +useCreatePrivateFeed()
    }

    class UpdatePrivateFeedHook {
        Input: IUpdatePrivateFeedInput
        Output: void
        +useUpdatePrivateFeed()
    }

    class DeletePrivateFeedHook {
        Input: IDeletePrivateFeedInput
        Output: void
        +useDeletePrivateFeed()
    }

    %% Relationships
    GetPrivateFeedsHook --> IFeedItem : returns
    CreatePrivateFeedHook --> ICreatePrivateFeedInput : accepts
    UpdatePrivateFeedHook --> IUpdatePrivateFeedInput : accepts
    DeletePrivateFeedHook --> IDeletePrivateFeedInput : accepts
    IFeedItem --> IUserSrv : contains
    IFeedItem --> IRate : contains
    IFeedItem --> IUserPostInfo : contains
``` 
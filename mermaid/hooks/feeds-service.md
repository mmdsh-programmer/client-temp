```mermaid
%% Feeds Service
%% This diagram shows all hooks related to feeds functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
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
        Input: ssoId: number, size: number, repoId?: number
        Output: IFeedItem[]
        +useGetPrivateFeeds()
    }

    class GetPublicFeedsHook {
        Input: size: number
        Output: IFeedItem[]
        +useGetPublicFeeds()
    }

    %% Relationships
    GetPrivateFeedsHook --> IFeedItem : returns
    GetPublicFeedsHook --> IFeedItem : returns
    IFeedItem --> IUserSrv : contains
    IFeedItem --> IRate : contains
    IFeedItem --> IUserPostInfo : contains
``` 
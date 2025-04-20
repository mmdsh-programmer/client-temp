```mermaid
%% PublicFeed Service
%% This diagram shows all hooks related to publicFeed functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class ICreatePublicFeedInput {
        +name: string
        +content: string
        +link?: string
        +image?: string
        +callBack?: () => void
    }

    class IUpdatePublicFeedInput {
        +feedId: number
        +name: string
        +content: string
        +link?: string
        +image?: string
        +callBack?: () => void
    }

    class IDeletePublicFeedInput {
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
    class GetPublicFeedsHook {
        Input: size: number
        Output: IFeedItem[]
        +useGetPublicFeeds()
    }

    class GetFeedImagesHook {
        Input: size: number
        Output: string[]
        +useGetFeedImages()
    }

    class CreatePublicFeedHook {
        Input: ICreatePublicFeedInput
        Output: void
        +useCreatePublicFeed()
    }

    class UpdatePublicFeedHook {
        Input: IUpdatePublicFeedInput
        Output: void
        +useUpdatePublicFeed()
    }

    class DeletePublicFeedHook {
        Input: IDeletePublicFeedInput
        Output: void
        +useDeletePublicFeed()
    }

    %% Relationships
    GetPublicFeedsHook --> IFeedItem : returns
    CreatePublicFeedHook --> ICreatePublicFeedInput : accepts
    UpdatePublicFeedHook --> IUpdatePublicFeedInput : accepts
    DeletePublicFeedHook --> IDeletePublicFeedInput : accepts
    IFeedItem --> IUserSrv : contains
    IFeedItem --> IRate : contains
    IFeedItem --> IUserPostInfo : contains
``` 
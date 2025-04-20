```mermaid
%% Domain Subscription Service
%% This diagram shows all hooks related to domain subscription functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class IAcceptSubscriptionInput {
        +requestId: number
        +callBack?: () => void
    }

    class IRejectSubscriptionInput {
        +requestId: number
        +callBack?: () => void
    }
    
    %% Output Interfaces
    class IDomainSubscription {
        +id: number
        +repoId: number
        +repoName: string
        +repoTypeName: string
        +repoTypeId: number
        +status: "accepted" | "pending" | "rejected"
        +type: "subscribe" | "unsubscribe"
        +userFullName: string
        +username: string
        +userSSOID: number
        +domainUrl: string
        +requestId: number
        +userId: number
    }

    %% Hooks
    class GetSubscriptionListHook {
        Input: size: number
        Output: IDomainSubscription[]
        +useGetSubscriptionList()
    }

    class AcceptSubscriptionHook {
        Input: IAcceptSubscriptionInput
        Output: void
        +useAcceptSubscription()
    }

    class RejectSubscriptionHook {
        Input: IRejectSubscriptionInput
        Output: void
        +useRejectSubscription()
    }

    %% Relationships
    GetSubscriptionListHook --> IDomainSubscription : returns
    AcceptSubscriptionHook --> IAcceptSubscriptionInput : accepts
    RejectSubscriptionHook --> IRejectSubscriptionInput : accepts
``` 
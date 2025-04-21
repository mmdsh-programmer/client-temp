```mermaid
%% Position Service
%% This diagram shows all hooks related to position functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class ICreatePositionInput {
        +branchId: number
        +title: string
        +members?: string[]
        +callBack?: () => void
    }

    class IUpdatePositionInput {
        +branchId: number
        +positionName: string
        +title: string
        +members?: string[]
        +callBack?: () => void
    }

    class IDeletePositionInput {
        +branchId: number
        +positionName: string
        +callBack?: () => void
    }

    class IAddMembersInput {
        +branchId: number
        +positionName: string
        +members: string[]
        +callBack?: () => void
    }

    class IDeleteMembersInput {
        +branchId: number
        +positionName: string
        +members: string[]
        +callBack?: () => void
    }

    class ISetGrantsInput {
        +branchId: number
        +positionName: string
        +serviceNames: string[]
    }

    class IAssignPositionToSubBranchInput {
        +branchId: number
        +positionName: string
        +subBranchId: number
        +callBack?: () => void
    }
    
    %% Output Interfaces
    class IPosition {
        +expireGrants
        +groupId: number
        +accessNames: []
        +groupPath: string
        +title: string
    }
    
    class IPositionInfo {
        +hasError: boolean
        +messageId: number
        +referenceNumber: string
        +errorCode: number
        +message: string
        +ott: number
        +groupParentId: number
        +groupId: number
        +name: string
        +title: string
        +path: string
        +members: IPositionMember[]
        +cascadeGroupAccess: boolean
        +active: boolean
        +creator: number
    }
    
    class IPositionMember {
        +preferred_username: string
        +given_name: string
        +family_name: string
        +id: number
        +picture: string
        +phone_number_verified: boolean
        +email_verified: boolean
        +nationalcode_verified: boolean
    }

    %% Hooks
    class GetPositionsHook {
        Input: branchId: number, size: number
        Output: IPosition[]
        +useGetPositions()
    }

    class GetPositionInfoHook {
        Input: branchId?: number, positionName?: string
        Output: IPositionInfo
        +useGetPositionInfo()
    }

    class CreatePositionHook {
        Input: ICreatePositionInput
        Output: void
        +useCreatePosition()
    }

    class UpdatePositionHook {
        Input: IUpdatePositionInput
        Output: void
        +useUpdatePosition()
    }

    class DeletePositionHook {
        Input: IDeletePositionInput
        Output: void
        +useDeletePosition()
    }

    class AddMembersHook {
        Input: IAddMembersInput
        Output: void
        +useAddMembers()
    }

    class DeleteMembersHook {
        Input: IDeleteMembersInput
        Output: void
        +useDeleteMembers()
    }

    class SetGrantsHook {
        Input: ISetGrantsInput
        Output: void
        +useSetGrants()
    }

    class AssignPositionToSubBranchHook {
        Input: IAssignPositionToSubBranchInput
        Output: void
        +useAssignPositionToSubBranch()
    }

    %% Relationships
    GetPositionsHook --> IPosition : returns
    GetPositionInfoHook --> IPositionInfo : returns
    CreatePositionHook --> ICreatePositionInput : accepts
    UpdatePositionHook --> IUpdatePositionInput : accepts
    DeletePositionHook --> IDeletePositionInput : accepts
    AddMembersHook --> IAddMembersInput : accepts
    DeleteMembersHook --> IDeleteMembersInput : accepts
    SetGrantsHook --> ISetGrantsInput : accepts
    AssignPositionToSubBranchHook --> IAssignPositionToSubBranchInput : accepts
    IPositionInfo --> IPositionMember : contains
``` 
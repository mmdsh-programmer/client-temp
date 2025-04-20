```mermaid
%% Editor Service
%% This diagram shows all hooks related to editor functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class ISaveEditorInput {
        +repoId: number
        +documentId: number
        +versionId: number
        +versionNumber: string
        +content: string
        +outline: string
        +versionState: string
        +isDirectAccess?: boolean
        +callBack?: () => void
        +errorCallback?: () => void
    }

    class ISaveFileEditorInput {
        +repoId: number
        +documentId: number
        +versionId: number
        +versionNumber: string
        +fileHash: IFileHash
        +isDirectAccess?: boolean
        +callBack?: () => void
    }

    class IFreeDraftInput {
        +repoId: number
        +documentId: number
        +versionId: number
        +versionNumber: string
        +content: string
        +outline: string
        +isDirectAccess?: boolean
        +callBack?: () => void
    }

    class ICreateBlockInput {
        +repoId: number
        +documentId: number
        +versionId: number
        +isDirectAccess?: boolean
        +callBack?: (result: IBLockDocument) => void
        +handleError?: () => void
    }
    
    %% Helper Interfaces
    class IFileHash {
        +hash: string
        +fileName: string
        +fileExtension: string
    }
    
    class IBlockUser {
        +name: string
        +ssoId: number
    }
    
    %% Output Interfaces
    class IBLockDocument {
        +blockTime: number
        +user: IBlockUser
        +vId: number
    }

    %% Hooks
    class SaveEditorHook {
        Input: ISaveEditorInput
        Output: void
        +useSaveEditor()
    }

    class SaveFileEditorHook {
        Input: ISaveFileEditorInput
        Output: void
        +useSaveFileEditor()
    }

    class FreeDraftHook {
        Input: IFreeDraftInput
        Output: void
        +useFreeDraft()
    }

    class CreateBlockHook {
        Input: ICreateBlockInput
        Output: IBLockDocument
        +useCreateBlock()
    }

    %% Relationships
    SaveEditorHook --> ISaveEditorInput : accepts
    SaveFileEditorHook --> ISaveFileEditorInput : accepts
    ISaveFileEditorInput --> IFileHash : contains
    FreeDraftHook --> IFreeDraftInput : accepts
    CreateBlockHook --> ICreateBlockInput : accepts
    CreateBlockHook --> IBLockDocument : returns
    IBLockDocument --> IBlockUser : contains
``` 
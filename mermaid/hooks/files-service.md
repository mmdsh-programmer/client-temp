```mermaid
%% Files Service
%% This diagram shows all hooks related to files functionality

---
config:
  look: neo
  theme: default
  layout: elk
---

classDiagram
    direction TB
    %% Input Interfaces
    class ICreateUploadLinkInput {
        +resourceId: number
        +userGroupHash: string
        +successCallBack?: (result: string) => void
    }

    class IDeleteFileInput {
        +repoId: number
        +resourceId: number
        +fileHash: string
        +type: "private" | "public"
        +userGroupHash: string
        +callBack?: () => void
    }

    class IRenameFileInput {
        +resourceId: number
        +newName: string
        +hash: string
        +userGroupHash: string
        +callBack?: () => void
    }
    
    %% Output Interfaces
    class IFileList {
        +list: IFile[]
        +count: number
    }
    
    class IFile {
        +attributes: any[]
        +created: number
        +extension: string
        +hash: string
        +name: string
        +owner: IFileOwner
        +parentHash: string
        +postId?: number
        +size: number
        +thumbnail: string
        +type: string
        +updated: number
        +uploader: IFileUploader
        +version: string
    }
    
    class IFileOwner {
        +username: string
        +name: string
        +ssoId: number
        +roles: string[]
    }
    
    class IFileUploader {
        +username: string
        +name: string
        +ssoId: number
        +roles: string[]
    }

    %% Hooks
    class GetFilesHook {
        Input: resourceId: number, userGroupHash: string, size: number, name?: string, order?: string, dataType?: string
        Output: IFileList
        +useGetFiles()
    }

    class CreateUploadLinkHook {
        Input: ICreateUploadLinkInput
        Output:  uploadHash: string 
        +useCreateUploadLink()
    }

    class DeleteFileHook {
        Input: IDeleteFileInput
        Output: void
        +useDeleteFile()
    }

    class RenameFileHook {
        Input: IRenameFileInput
        Output: void
        +useRenameFile()
    }

    %% Relationships
    GetFilesHook --> IFileList : returns
    CreateUploadLinkHook --> ICreateUploadLinkInput : accepts
    DeleteFileHook --> IDeleteFileInput : accepts
    RenameFileHook --> IRenameFileInput : accepts
    IFileList --> IFile : contains
    IFile --> IFileOwner : contains
    IFile --> IFileUploader : contains
``` 
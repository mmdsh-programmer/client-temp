export enum ERequest {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
  HEAD = "head",
}

export enum ERoles {
  admin = "admin",
  editor = "editor",
  owner = "owner",
  viewer = "viewer",
  writer = "writer",
  default = "default",
}

export enum EDraftStatus {
  editing = "editing",
  pending = "pending",
  rejected = "rejected",
  accepted = "accepted",
}

export enum EVersionStatus {
  public = "public",
  private = "private",
  pending = "pending",
  rejected = "rejected",
}

export enum EDocumentTypes {
  stakeholders = "stakeholders",
  projectreport = "projectreport",
  meeting = "meeting",
  classic = "clasor",
  feedback = "feedback",
  file = "file",
  word = "word",
  flowchart = "flowchart",
  excel = "excel",
  board = "board",
  latex = "latex",
}

export enum ECategoryAction {
  CREATE = "create",
  DELETE = "delete",
  EDIT = "edit",
  MOVE = "move",
  SHOW = "show",
  ACCESS = "access",
}

export enum EDocumentAction {
  CREATE = "create",
  DELETE = "delete",
  EDIT = "edit",
  MOVE = "move",
  SHOW = "show",
  LAST_VERSION = "last-version",
  ACCESS = "access",
  TAGS = "tags",
  MODE = "mode",
}

export enum EVersionAction {
  CREATE = "create",
  DELETE = "delete",
  EDIT = "edit",
  MOVE = "move",
  SHOW = "show",
}

export enum ERepoAction {
  CREATE = "create",
  DELETE = "delete",
  EDIT = "edit",
  MOVE = "move",
  MENU = "menu",
}

export enum EChatType {
  OWNER_GROUP = "OWNER_GROUP",
}

export enum IframeAction {
  SAVE = "save",
  FREE_DRAFT = "free-draft",
  LOAD = "load",
  TRACK_CHANGE = "track-change",
  HAND_SHAKE = "hand-shake",
  GET_DATA = "get-data",
  SET_DATA = "set-data",
  SAVE_PUBLISH = "save-publish",
}

export enum IframeMode {
  EDIT = "edit",
  PREVIEW = "preview",
}

export enum EDmsActions {
  LOAD = "load",
  LOGOUT = "logout",
  SWITCH = "switch",
}

export enum authStatus {
  loading = "loading",
  authenticated = "authenticated",
  unauthenticated = "unauthenticated",
}

export enum ETabValue {
  DOCUMENTS = "documents",
  USERS = "users",
  FILES = "files",
  SHARE_MANAGEMENT = "share-management",
  OPERATIONS = "operations",
}

export enum EListMode {
  card = "CARD",
  table = "TABLE",
}

export enum ERepoGrouping {
  DASHBOARD = "داشبورد",
  ALL_REPO = "همه‌ی مخزن‌ها",
  MY_REPO = "مخزن‌های من",
  ACCESS_REPO = "مخزن‌های اشتراکی",
  BOOKMARK_REPO = "مخزن‌های نشان‌شده",
  ARCHIVE_REPO = "‌‌مخزن‌های بایگانی‌شده",
  PUBLISHED_REPO = "مخزن های منتشر شده",
}

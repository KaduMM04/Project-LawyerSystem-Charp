export enum HealthPaths {
    GET_HEALTH = "/dbHealth",
}

export enum AuthPaths {
    LOGIN = "api/User/Login",
    CREATE_FULL_LAWYER = "api/User/createFullLawyer",
    CREATE_FULL_CLIENT = "api/User/createFullClient",
    PATCH_LAWYER = "api/User/patch/Lawyer",
    PATCH_CLIENT = "api/User/patch/Client",
}

export enum UserPaths {
  GET_USER_BY_ID = "/user/{id}",
  GET_ALL_USERS = "/user/all",
  GET_CLIENT_USER = "/user/clientUser/{id}",
}


export enum ClientPaths {
  GET_CLIENT_BY_ID = "api/Client/{id}",
  GET_ALL_CLIENTS = "api/Client/all",
  CREATE_CLIENT = "api/Client",
}

export enum LawyerPaths {
    GET_LAWYER_BY_ID = "api/Lawyer/{id}",
    GET_ALL_LAWYERS = "api/Lawyer/all",
    CREATE_LAWYER = "api/Lawyer",
}


export enum CasePaths {
  GET_ALL_CASES = "api/case/all",
  CREATE_CASE = "api/case/create",
}

export enum CaseEventPaths {
    GET_ALL_CASE_EVENTS = "api/caseEvent/all",
    CREATE_CASE_EVENT = "api/caseEvent/create",
    GET_CASE_EVENT_BY_ID = "api/caseEvent/unique/{id}",
}


export enum AddressPaths {
    GET_ALL_ADDRESSES = "api/address/all",
    CREATE_ADDRESS = "api/address/create",
}

import { TypeCases } from '../enums/TypeCases'
import { CaseStatus } from '../enums/CaseStatus'

export namespace CaseDtos {
    export interface Case {
        Type: TypeCases;
        Description: string;
        Status: CaseStatus;
        LawyerOAB: string;
        ClientId: string;
    }
}

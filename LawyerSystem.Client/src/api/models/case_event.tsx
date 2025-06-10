import { EventType } from "../enums/EventType";
import { EventStatus } from "../enums/EventStatus";

export interface CaseEventDtos {
    Title: string;
    Description: string;
    EventDate: Date;
    EventType: EventType;
    EventStatus: EventStatus;
    caseId: string;
}

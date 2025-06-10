import { CaseEventPaths } from "../enums/routes";
import { CaseEventDtos } from "../models/case_event";
import apiClient from "../config";


async function getAllCaseEvents(): Promise<CaseEventDtos[]> {
    try {
        const response = await apiClient.get(CaseEventPaths.GET_ALL_CASE_EVENTS);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function getCaseEventsByCaseId(caseId: string): Promise<CaseEventDtos[]> {
    try {
        const response = await apiClient.get(CaseEventPaths.GET_CASE_EVENT_BY_ID.replace("{id}", caseId));
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function createCaseEvent(caseEventData: CaseEventDtos): Promise<any> {
    try {
        const response = await apiClient.post(CaseEventPaths.CREATE_CASE_EVENT, caseEventData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

const CaseEventService = {
    getAllCaseEvents,
    createCaseEvent,
    getCaseEventsByCaseId,
};
export type CaseEventServiceType = typeof CaseEventService;
export default CaseEventService;
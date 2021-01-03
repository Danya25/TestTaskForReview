import {MissionPriority} from './enums/mission-priority.enum';

export interface Mission {
    title: string;
    description: string;
    endDate: Date;
    endTime: Date;
    priority: MissionPriority;
}

import {MissionPriority} from './enums/mission-priority.enum';

export interface Mission {
    id: number;
    title: string;
    description: string;
    endDate: Date;
    endTime: Date;
    priority: MissionPriority;
}

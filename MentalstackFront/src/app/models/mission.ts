import {MissionPriority} from './enums/mission-priority.enum';

export interface Mission {
    title: string;
    description: string;
    EndDate: Date;
    priority: MissionPriority;
}

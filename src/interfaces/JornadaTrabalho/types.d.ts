export type WeekDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
export type TimeCourse = 'afternoon' | 'morning';

export interface CreateBody {
    idPessoa: number;
    data: { day: string, timeCourse: TimeCourse }[];
}

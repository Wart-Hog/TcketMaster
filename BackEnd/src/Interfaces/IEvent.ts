export interface IEvent {
    id: string,
    name: string,
    type: "music" | "sport" | "theatre",
    place: string,
    dateTime: Date,
} 
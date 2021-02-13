import {ITicket} from './ITicket'

export interface IUser{
    name: string,
    username: string,
    password: string,
    events : ITicket []
}
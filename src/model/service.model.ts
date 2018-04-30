import { StringSchema } from 'nats-hemera';

export interface IServiceModel {
    id?: StringSchema;
    name: StringSchema;
}

export interface ID {
    id: StringSchema;
}

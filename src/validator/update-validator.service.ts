import { Service } from 'justinject';
import { IServiceModel } from '../model/service.model';
import { HemeraService } from '../hemera/hemera.service';

@Service()
export class UpdateValidatorService {

    constructor(public hemera: HemeraService) { }

    get schema() {

        return this.hemera.joi.object().required()
            .keys<IServiceModel>(
            {
                name: this.hemera.joi.string().required(),
                id: this.hemera.joi.string().required(),
            });
    }
}

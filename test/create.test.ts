import * as chai from 'chai';
import { Boot } from './boot';
import * as Hemera from 'nats-hemera';

const expect = chai.expect;

const testData: any = {
    name: 'Vladimir'
}

let hemera: Hemera;

describe('Test for creating new entity', function () {

    before((done) => {
        const boot = new Boot();
        boot.instance()
            .then((instance: any) => {
                hemera = instance;
                done();
            })
            .catch((error: any) => {
                
                throw error
            })
    });


    after((done) => {
        hemera.close(done);
    })

    it('Validation works', (done) => {
        hemera.act({
            topic: 'test.service',
            cmd: 'create',
        }, (error: any, resp: any) => {
            expect(error.message).to.be.equals('child "data" fails because ["data" is required]')
        })

        hemera.act({
            topic: 'test.service',
            cmd: 'create',
            data: {

            }
        }, (error: any, resp: any) => {
            expect(error.message).to.be.equals('child "data" fails because [child "name" fails because ["name" is required]]')
            done();
        })
    });

    it('Create new entity', (done) => {
        hemera.act({
            topic: 'test.service',
            cmd: 'create',
            data: testData
        }, (err: any, resp: any) => {
            expect(resp.name).to.be.equals('Vladimir');
            expect(resp.id).to.exist;
            done();
        })
    });
})
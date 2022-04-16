import { AutenticationService } from '../../services/AutenticationService';
import {  } from '../../models/User';

jest.mock('typeorm');
jest.mock('../../models/User')

beforeEach(() => {
    const auth = new AutenticationService();
})


describe('AuthenticationService', () => {
    it('Login', async () => {
        expect(1).toBe(1)
    })
})
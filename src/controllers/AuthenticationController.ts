import { AutenticationService } from "../services/AutenticationService";

export class AuthenticationController {

    async login(req, res, next) {
        const { email, password } = req.body;
        const service = new AutenticationService();

        const result = await service.login(email, password);

        if(result instanceof Error){
            return res.status(400).json(result.message);
        }

        res.json(result);
    }

}

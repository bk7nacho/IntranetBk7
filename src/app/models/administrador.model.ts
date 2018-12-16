import {PersonaModel} from "./persona.model";
import {UsuarioModel} from "./usuario.model";

export class AdministradorModel {
    public id: number;
    public persona: PersonaModel;
    public user: UsuarioModel;
    public estado: number;

    constructor() {
        this.persona = new PersonaModel();
        this.user = new UsuarioModel();
    }
}
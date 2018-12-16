import {DepartamentoModel} from "./departamento.model";
import {ProvinciaModel} from "./provincia.model";
import {DistritoModel} from "./distrito.model";
import {AdministradorModel} from "./administrador.model";

export class PersonaModel {
    public id: number;
    public nombres: string;
    public paterno: string;
    public materno: string;
    public numdocumento: string;
    public sexo: string;
    public fijo1: string;
    public fijo2: string;
    public celular1: string;
    public celular2: string;
    public nacimiento: Date;
    public direccion: string;
    public correopersonal: string;
    public gradoestudios_id: number;
    public profesiones_id: number;
    public tipodocumentos_id: number;
    public paises_id: number;
    public departamentos_id: number;
    public provincias_id: number;
    public distritos_id: number;
    public estado: string;

    public departamentos: DepartamentoModel;
    public provincias: ProvinciaModel;
    public distritos: DistritoModel;

    constructor() {
        this.departamentos = new DepartamentoModel();
        this.provincias = new ProvinciaModel();
        this.distritos = new DistritoModel();
    }
}

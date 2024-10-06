import { Cliente } from "../entities/cliente.entity";

export interface IClienteRepository {
    create(cliente: Cliente): Promise<Cliente>;
    update(cliente: Cliente): Promise<Cliente>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Cliente[]>;
    findById(id: number): Promise<Cliente>;
    findByCpf(cpf: string): Promise<Cliente>;
    }
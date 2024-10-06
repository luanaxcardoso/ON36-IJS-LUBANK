import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IClienteRepository } from 'src/domain/interfaces/cliente.repository.interface';
import { Cliente } from 'src/domain/entities/cliente.entity';

@Injectable()
export class ClienteRepository implements IClienteRepository {
    constructor(
        @InjectRepository(Cliente)
        private readonly repository: Repository<Cliente>,
    ) {}

    async create(cliente: Cliente): Promise<Cliente> {
        return this.repository.save(cliente);
    }

    async update(cliente: Cliente): Promise<Cliente> {
        return this.repository.save(cliente);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async findAll(): Promise<Cliente[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Cliente> {
        return this.repository.findOne({ where: { id } });
    }

    async findByCpf(cpf: string): Promise<Cliente> {
        return this.repository.findOne({ where: { cpf } });
    }

    async save(cliente: Cliente): Promise<Cliente> {
        return this.repository.save(cliente);
    }
}

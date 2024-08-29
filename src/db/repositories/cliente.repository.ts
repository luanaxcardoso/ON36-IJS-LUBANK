import { Injectable } from '@nestjs/common';
import { Repository, DataSource, Between } from 'typeorm';
import { Cliente } from 'src/db/entities/cliente.entity';

@Injectable()
export class ClienteRepository extends Repository<Cliente> {
  constructor(private readonly dataSource: DataSource) {
    super(Cliente, dataSource.createEntityManager());
  }

  async adicionarCliente(cliente: Cliente): Promise<Cliente> {
    return this.save(cliente);
  }

  async encontrarPorCpf(cpf: string): Promise<Cliente | undefined> {
    return this.findOne({ where: { cpf } });
  }

  async encontrarPorId(id: number): Promise<Cliente | undefined> {
    return this.findOne({ where: { id } });
  }

  async encontrarPorStatus(): Promise<Cliente[]> {
    return this.find({ where: { statusAtivo: true } });
  }

  async encontrarPorCidade(cidade: string): Promise<Cliente[]> {
    return this.find({ where: { cidade } });
  }

  async encontrarPorEstado(estado: string): Promise<Cliente[]> {
    return this.find({ where: { estado } });
  }

  async encontrarPorCep(cep: string): Promise<Cliente[]> {
        return this.find({ where: { cep } });
}

  async desativarCliente(id: number): Promise<void> {
    await this.update(id, { statusAtivo: false });
  }

  async alterarrCliente(id: number): Promise<void> {
    await this.update(id, { statusAtivo: true });
  }

  async atualizarRenda(id: number, rendaSalarial: number): Promise<void> {
    await this.update(id, { rendaSalarial });
  }

  async clienteAtivo(id: number): Promise<boolean> {
    const cliente = await this.encontrarPorId(id);
    return cliente ? cliente.statusAtivo : false;
  }

  async encontrarPorFaixaDeRenda(minRenda: number, maxRenda: number): Promise<Cliente[]> {
    return this.find({
      where: {
        rendaSalarial: Between(minRenda, maxRenda),
      },
    });
  }

  async encontrarPorContas(): Promise<Cliente[]> {
    return this.createQueryBuilder('cliente')
      .leftJoinAndSelect('cliente.contas', 'conta')
      .getMany();
  }

    
}

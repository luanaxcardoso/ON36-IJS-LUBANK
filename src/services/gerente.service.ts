import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Gerente } from '../models/gerente.model';
import { Cliente } from 'src/models/cliente.model';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];

  criarGerente(gerente: Gerente): Gerente {
    const gerenteExistente = this.gerentes.find(g => g.id === gerente.id);
    if (gerenteExistente) {
      throw new ConflictException(`Gerente com ID ${gerente.id} já existe.`);
    }
    
    gerente.id = this.gerentes.length > 0 ? this.gerentes[this.gerentes.length - 1].id + 1 : 1;
    console.log('Criando gerente:', gerente);
    this.gerentes.push(gerente);
    console.log('Gerente após criação:', this.gerentes);
    return gerente;
  }

  buscarGerente(id: number): Gerente {
    console.log('Buscando gerente com id:', id);
    const gerente = this.gerentes.find(g => g.id === id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    return gerente;
  }

  buscarGerentes(): Gerente[] {
    return this.gerentes;
  }

  atualizarGerente(id: number, gerenteAtualizado: Partial<Gerente>): Gerente {
    const gerente = this.gerentes.find(g => g.id === id);
    if (gerente) {
      Object.assign(gerente, gerenteAtualizado);
      return gerente;
    }
    throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
  }

  deletarGerente(id: number): { message: string } {
    console.log('Deletando gerente com id:', id);
    const gerente = this.gerentes.find(g => g.id === id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    this.gerentes = this.gerentes.filter(g => g.id !== id);
    console.log('Gerente deletado com sucesso.');
    return { message: `Gerente com ID ${id} removido com sucesso.` };
  }

  adicionarClienteAoGerente(gerenteId: number, cliente: Cliente): Gerente {
    const gerente = this.buscarGerente(gerenteId);

    if (!gerente.clientes) {
      gerente.clientes = [];
    }

    const clienteExistente = gerente.clientes.find(c => c.id === cliente.id);
    if (clienteExistente) {
      throw new ConflictException(`Cliente com ID ${cliente.id} já está associado a este gerente.`);
    }

    gerente.clientes.push(cliente);
    return gerente;
  }
}

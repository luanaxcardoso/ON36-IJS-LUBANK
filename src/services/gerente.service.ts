import { Injectable, NotFoundException } from '@nestjs/common';
import { Gerente } from '../models/gerente.model';
import { Cliente } from 'src/models/cliente.model';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];

  criarGerente(gerente: Gerente): Gerente {
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

  atualizarGerente(id: number, gerenteAtualizado: Partial<Gerente>): Gerente | undefined {
    const gerente = this.gerentes.find(g => g.id === id);
    if (gerente) {
      Object.assign(gerente, gerenteAtualizado);
      return gerente;
    }
    throw new NotFoundException(`Gerente não encontrado.`);
  }

  deletarGerente(id: number): { message: string } {
    console.log('Deletando gerente com id:', id);
    const gerente = this.gerentes.find(g => g.id === id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    this.gerentes = this.gerentes.filter(g => g.id !== id);
    return { message: `Gerente com ID ${id} removido com sucesso.` };
  }

  
  adicionarClienteAoGerente(gerenteId: number, cliente: Cliente): Gerente {
    const gerente = this.buscarGerente(gerenteId);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${gerenteId} não encontrado.`);
    }

    if (!gerente.clientes) {
      gerente.clientes = [];
    }

    gerente.clientes.push(cliente);
    return gerente;
}

}
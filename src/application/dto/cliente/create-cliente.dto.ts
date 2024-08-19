import { IsNotEmpty, IsEmail, IsNumber, IsString, IsMobilePhone, Length, IsBoolean, Min, IsArray, IsOptional } from 'class-validator';
import { Conta } from '../../../domain/models/contas/conta.model';
import { InterfacePessoa } from '../../../domain/interfaces/pessoa.interface';

export class CreateClienteDto implements InterfacePessoa {
  @IsOptional()
  @IsNumber({}, { message: 'O ID deve ser um número.' })
  id?: number;

  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString()
  nome: string;

  @IsString()
  dataNascimento: string;

  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'Email inválido.' })
  email: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @IsMobilePhone('pt-BR')
  telefone: string;

  @IsString()
  endereco: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  @IsString()
  @Length(8, 8, { message: 'O CEP deve ter 8 caracteres.' })
  cep: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @IsString()
  @Length(11, 11, { message: 'O CPF deve ter 11 caracteres.' })
  cpf: string;

  @IsNumber({}, { message: 'A renda salarial deve ser um número.' })
  @Min(0, { message: 'A renda salarial não pode ser negativa.' })
  rendaSalarial: number;

  @IsNotEmpty({ message: 'O status ativo é obrigatório.' })
  @IsBoolean({ message: 'O status ativo deve ser verdadeiro ou falso.' })
  statusAtivo: boolean;

  @IsArray({ message: 'Contas deve ser uma lista de contas.' })
  conta: Conta[];
}

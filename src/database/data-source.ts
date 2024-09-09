import { DataSource, DataSourceOptions } from 'typeorm';
import { Cliente } from 'src/domain/entities/cliente.entity';
import { Conta } from 'src/domain/entities/contas/conta.entity';
import { Gerente } from 'src/domain/entities/gerente.entity';
import 'dotenv/config'; 
import { ContaCorrente } from 'src/domain/entities/contas/contacorrente.entity';
import { ContaPoupanca } from 'src/domain/entities/contas/contapoupanca.entity';

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [Cliente, Gerente, Conta, ContaCorrente, ContaPoupanca],
    synchronize: false, 
};

export const AppDataSource = new DataSource(dataSourceOptions);

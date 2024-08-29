import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { Conta } from './entities/conta.entity';
import { Gerente } from './entities/gerente.entity';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [Cliente, Conta, Gerente],  
  migrations: [__dirname + '/migrations/*.ts'],  
  synchronize: false,
};

export default new DataSource(dataSourceOptions);

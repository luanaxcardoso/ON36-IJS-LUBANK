Iniciando o projeto com TypeScript
====================
Para iniciar um projeto com TypeScript, basta executar o comando para criar o arquivo package.json:
````bash
npm init -y
````

Para criar o tsconfig.json, basta executar o comando:
````bash	
tsc -init
````
Configurar:
````json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
    }
}
````



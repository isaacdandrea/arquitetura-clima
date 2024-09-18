
# Trabalho de Arquitetura e Soluçoes Computacionais
Aplicativo que realiza consultas direcionadas a um
serviço de condições climáticas

---

## Integrantes:
- Gabriel Carrasco - 22.00906-0
- Gustavo Yudji Hiromoto - 22.00849-0
- Isaac d'Andrea - 22.01841-7
- Lucas Pennone -  21.01086-2
- Matheus Alatxeve - 20.00528-8
- Othavio Carvalho Losovoi - 22.01545-0

---
**Descrição do Projeto:** O projeto serve para demonstrar conceitos de entendimento de uso de requisiçoes de API. O software faz duas requisições, buscando as coordenadas de um local especificado pelo Usuario e usando as coordenadas que foram obtidas para obter sensação termica e descrição do clima daquelas coordenadas.

---

## Instalação

Após fazer git clone, instale as dependencias usando
```bash
  npm install
```
Renomeie o arquivo ```.env.example``` para apenas ```.env```

No arquivo ```.env``` atualize o campo
```bash 
APP_ID= <SuaChave>
```
e substitua <SuaChave> por uma chave de API gerada no site
[https://openweathermap.org/api](https://openweathermap.org/api)


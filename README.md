# Shopify Backend — Railway

## Deploy em 5 minutos

### 1. Crie o repositório no GitHub
1. Acesse github.com e faça login
2. Clique em **New repository**
3. Nome: `shopify-backend` → clique **Create repository**
4. Na tela seguinte, clique em **uploading an existing file**
5. Arraste os 3 arquivos: `index.js`, `package.json`, `.env.example`
6. Clique **Commit changes**

### 2. Deploy no Railway
1. Acesse railway.app e faça login com GitHub
2. Clique **New Project → Deploy from GitHub Repo**
3. Selecione `shopify-backend`
4. Aguarde o deploy (1-2 min)
5. Vá em **Variables** e adicione:
   - `SHOPIFY_STORE` = sua-loja.myshopify.com
   - `SHOPIFY_TOKEN` = shpat_seu_token_aqui
6. Vá em **Settings → Networking → Generate Domain**
7. Copie a URL gerada (ex: https://shopify-backend-xxx.up.railway.app)

### 3. Teste
Abra no navegador: https://SUA-URL.up.railway.app/orders
Se aparecer JSON com pedidos = funcionou!

### 4. Cole a URL no dashboard HTML
No arquivo HTML, procure a linha:
  var API_URL = 'COLE_SUA_URL_AQUI';
E substitua pela URL do Railway.

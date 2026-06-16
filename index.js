const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite chamadas do seu HTML
app.use(express.json());

const STORE = process.env.SHOPIFY_STORE;   // ex: minha-loja.myshopify.com
const TOKEN = process.env.SHOPIFY_TOKEN;   // shpat_xxx

// Rota principal — retorna pedidos com classificação de dias
app.get('/orders', async (req, res) => {
  try {
    const response = await axios.get(
      `https://${STORE}/admin/api/2024-01/orders.json?status=open&limit=250`,
      { headers: { 'X-Shopify-Access-Token': TOKEN } }
    );

    const orders = response.data.orders.map(function(o) {
      const days = Math.floor((new Date() - new Date(o.created_at)) / 86400000);
      const status = days <= 6 ? 'ok' : days <= 10 ? 'warn' : 'crit';
      return {
        id: o.id,
        order_number: o.order_number,
        created_at: o.created_at,
        days: days,
        status: status,
        fulfillment_status: o.fulfillment_status || 'unfulfilled',
        tracking_number: o.fulfillments && o.fulfillments[0] ? o.fulfillments[0].tracking_number : null,
        total: o.current_total_price,
        currency: o.currency,
        customer: {
          first_name: o.customer ? o.customer.first_name : '',
          last_name: o.customer ? o.customer.last_name : '',
          email: o.customer ? o.customer.email : '',
          phone: o.customer ? o.customer.phone : ''
        }
      };
    });

    res.json({ ok: true, orders: orders, total: orders.length });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Health check
app.get('/', function(req, res) {
  res.json({ status: 'online', store: STORE || 'não configurado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Servidor rodando na porta ' + PORT);
});

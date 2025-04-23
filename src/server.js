const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/send-sms', async (req, res) => {
  const { phone, message } = req.body;
  
  try {
    const response = await axios.get('https://sms.ru/sms/send', {
      params: {
        api_id: process.env.SMS_API_KEY = '54E9969C-95A5-BED3-E659-5DE500BD7624',
        to: phone,
        msg: message,
        json: 1
      }
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка отправки SMS' });
  }
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
(backend/server.js)

const express = require('express');
const bodyParser = require('body-parser');
const interactRoutes = require('./routes/interact');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/interact', interactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
JS




/code (backend/routes/interact.js)

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const userMessage = req.body.message;
  // Here we can add logic to generate a response from AI Tutor Dev
  const aiResponse = `You said: ${userMessage}`;
  res.json({ response: aiResponse });
});

module.exports = router;
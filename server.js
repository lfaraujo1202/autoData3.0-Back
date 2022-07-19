require('dotenv').config()

const app = require('./src/app')

// 3000, 6000, 6060, 8080, 8088

// app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

const fs = require('fs-extra')

class SelphBG {
    genEnv = async (config = Object, url = String) =>  {
        let initialEnv = `
            PORT=${config.apiPort}
            DB_USER= ${config?.db?.user ? config.db.user : config.name}
            DB_PASSWORD=${config?.db?.password ? config.db.password : 1234}
            DB_NAME=${config?.db?.name ? config.db.name : config.name + '_db'}
            DB_PORT=${config?.db?.port ? config.db.port : '27017'}
            JWT_TOKEN_SECRET=
            HASHING_SECRET=245033554257412
            API_URL=http://localhost:${config.apiPort}
        `
        fs.writeFileSync(`${url}/.env`, initialEnv);
       return 'BackEnd Env Generated...' 
    }
    genAppJs = async (config = Object, url = String) => {
     
            var data = fs.readFileSync('backend/src/app.js', 'utf-8');
            let httTempl = fs.readFileSync('/templates/httpApp.txt', 'utf-8')
          
            var newValue = data.replace(/^\./gim, httTempl);
          
            fs.writeFileSync('backend/src/app.js', newValue, 'utf-8');
          
            console.log('http App done complete');
          
    }
}

const selphBG = new SelphBG()

module.exports = selphBG
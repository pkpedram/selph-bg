const fs = require("fs-extra");
const { httpsTemplate, httpTemplate } = require("./templates");
const mg = require('selph-mg')
const cg = require('selph-cg')

class SelphBG {
  genEnv = async (config = Object, url = String) => {
    let initialEnv =
`PORT=${config.apiPort}
DB_USER= ${config?.db?.user ? config.db.user : config.name}
DB_PASSWORD=${config?.db?.password ? config.db.password : 1234}
DB_NAME=${config?.db?.name ? config.db.name : config.name + "_db"}
DB_PORT=${config?.db?.port ? config.db.port : "27017"}
JWT_TOKEN_SECRET=
HASHING_SECRET=245033554257412
API_URL=http://localhost:${config.apiPort}`;

    let currentEnv = fs.readFileSync(`${url}/.env`, 'utf-8')

    if(currentEnv !== initialEnv){
        fs.writeFileSync(`${url}/.env`, initialEnv);
        return "🟥 Selph - BackEnd Env Generated...";
    }else{
        return null
    }

  };
  genAppJs = async (config = Object, url = String) => {
    let currentFile = fs.readFileSync("backend/src/app.js", "utf-8");

    if (config.https == true) {
      if (currentFile !== httpsTemplate) {
        fs.writeFileSync("backend/src/app.js", httpsTemplate);
        return "🟥 Selph - HTTPS app.js generated...";
      } else {
        return null;
      }
    } else {
      if (currentFile !== httpTemplate) {
        fs.writeFileSync("backend/src/app.js", httpTemplate);
        return "🟥 Selph - HTTP app.js generated...";
      } else {
        return null;
      }
    }

  };

  genModels = async (config = Object) => {
        try {
            await mg(config)
        } catch (error) {
            throw error
        }
  }
  genCg = async(config = Object) => {
    try {
        await cg(config)
    } catch (error) {
        throw error
    }
  } 
}

const selphBG = new SelphBG();

module.exports = selphBG;

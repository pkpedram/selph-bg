const fs = require("fs-extra");
const { httpsTemplate, httpTemplate } = require("./templates");
const mg = require('selph-mg')
const cg = require('selph-cg');
const rg = require("selph-rg");
const sg = require("selph-sg");

class SelphBG {
  genEnv = async (config = Object, url = String) => {
    let initialEnv =
`PORT=${config.apiPort}
DB_USER= ${config?.db?.user ? config.db.user : config.name}
DB_PASSWORD=${config?.db?.password ? config.db.password : 1234}
DB_NAME=${config?.db?.name ? config.db.name : config.name + "_db"}
DB_PORT=${config?.db?.port ? config.db.port : "27017"}
JWT_TOKEN_SECRET=SelphIsCool12345678SelphSelph!!!===
HASHING_SECRET=245033554257412
API_URL=http://localhost:${config.apiPort}`;


   
        fs.writeFileSync(`${url}/.env`, initialEnv);
        return "🟥 Selph - BackEnd Env Generated...";
   

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
  genRg = async (config = Object) => {
    try {
        await rg(config)
    } catch (error) {
        throw error
    }
  }
  genSg = async (config = Object) => {
    try {
      await sg(config)
    } catch (error) {
      throw error
    }
  }
}

const selphBG = new SelphBG();

module.exports = selphBG;

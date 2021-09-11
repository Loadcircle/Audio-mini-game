const fs = require('fs');
const path = require('path');

const saveJson = async (req, res)=>{
    const {body} = req;

    const fileName = body.fileName || 'default';
    const data = body.data;

    const dbPath = path.join(__dirname, `../jsonFiles/${fileName}.json`);

    await fs.writeFileSync(dbPath, JSON.stringify(data));
    
    res.json({
        msg: 'Json file created successfully',
    });
}

const getJson = (req, res)=>{

    const fileName = "magic.json"
    
    const pathFile = path.join(__dirname, '../jsonFiles/'+fileName);
    if(fs.existsSync(pathFile)){
        return res.sendFile(pathFile)
    }
    
    res.status(400).json({
        msg: 'File does not exist',
    });
}

module.exports = {
    saveJson,
    getJson
}
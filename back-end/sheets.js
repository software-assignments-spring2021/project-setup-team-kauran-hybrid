const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet{
    constructor(){
        this.doc = new GoogleSpreadsheet('1_bl8F8i0guHGdry6kWwN9Tqkk-Qz9Vwm7p2dyq95dyU');

    }
    async load(){
        await this.doc.useServiceAccountAuth(require('./credentials.json'));

        await this.doc.loadInfo(); // loads document properties and worksheets
    }
    async addRows(rows){
        const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
        await sheet.addRows(rows);
    }
}
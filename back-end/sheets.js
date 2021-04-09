const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheets{

    constructor(){
        this.doc = new GoogleSpreadsheet('1rrpMC7uyX3ULE2PT7yvGc8q24Ori7001C-xljV-JoNk');

    }
    async load(){
        await this.doc.useServiceAccountAuth(require('./credentials.json'));

        await this.doc.loadInfo(); // loads document properties and worksheets
    }
    async addRow(row){
        const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
        // const sheet1 = await this.doc.addSheet({ headerValues: ['deptCourseId', 'subjectCode'] });
        await sheet.addRow(row);
    }
}
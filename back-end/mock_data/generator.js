const { getQueryHandlerAndSelector } = require('puppeteer');
const {PythonShell}=require('python-shell');

let options={
    mode: 'text',
    pythonOptions: ['-u'],

};
const generate=(parameters)=>{
    let pyshell=new PythonShell('./mock_data/generator.py');
    pyshell.on('message',function(message){
        console.log(message);
    });
    // PythonShell.run('./mock_data/generator.py',options,function(err) {
    //     if(err) {throw err;}
    //     console.log('finished');
    
    // });
    pyshell.end(function (err,code,signal){
        if(err) throw err;
        // console.log('Exit code was: '+code);
        // console.log('Exit signal was: '+signal);
        // console.log('finished');
    });
};

module.exports={generate};
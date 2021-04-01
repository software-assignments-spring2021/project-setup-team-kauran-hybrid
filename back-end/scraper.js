const axios=require('axios');

const cheerio=require('cheerio');

const fetch= require('node-fetch');
const nodemon = require('nodemon');

const puppeteer=require('puppeteer');

//scraper for rateMyProf
const prof_scraper=async(parameters)=>{

    const profName="Amos Bloomberg";
    const school="New York University";
    const browser=await puppeteer.launch({headless:true});
    const page=await browser.newPage();
    page. setDefaultTimeout (100000)
    //this goes to nyu school page on RMP
    await page.goto('https://www.ratemyprofessors.com/campusRatings.jsp?sid=675');
    //select input
    await page.waitForSelector('input');

    const inputProf=(await page.$$('input'))[1];
    //await inputProf.click();
    //type profName
    await inputProf.type(profName);
    //press down and then enter
   // await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(500);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);
    const res=(await page.$$('a'));

    const results=[];
    for(result of res){
        let thisRes=await page.evaluate(el=>el.textContent,result);
        if(thisRes){
            results.push([thisRes]);
        }

    }
    return results;


}

//scraper for Albert, might use BUGs NYU api
const albert_scraper=async()=>{
    const year=2021;
    const semester="su";
    const school="UA";
    const subject="DS";
    //const regis=0;
    const url='https://schedge.a1liu.com/'+year+'/'+semester+'/'+school+'/'+subject;
    //const url='https://schedge.a1liu.com/'+year+'/'+semester+'/'+regis;

    console.log(url)
    //"https://schedge.a1liu.com/2021/su/UA/CSCI"
    const result = await fetch(url)
        .then(res=>res.json())
        .then(json=>console.log(json));
    
    //axios
    //  .get(url)
    //  .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    //  .catch(err => next(err)) // pass any errors to express

    //console.log(JSON.parse(JSON.stringify(result)))
    
    //res.send(result)    
}


module.exports = {prof_scraper:prof_scraper,albert_scraper};
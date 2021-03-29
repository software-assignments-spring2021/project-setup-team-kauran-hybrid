const axios=require('axios');

const cheerio=require('cheerio');

const fetch= require('node-fetch');
const nodemon = require('nodemon');

const puppeteer=require('puppeteer');

//scraper for rateMyProf
const prof_scraper=async(parameters)=>{

    const profName="Amos";
    const school="New York University";
    const browser=await puppeteer.launch({headless:false});
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
    console.log({results});


}

//scraper for Albert, might use BUGs NYU api
const albert_scraper=async(parameters)=>{
    const year=2021;
    const semester="su";
    const school="College of Arts and Science";
    const subject="Computer Science";
    const url='https://schedge.a1liu.com/'+''+'${school}'+'${subject}'
    await fetch("https://schedge.a1liu.com/2021/su/UA/CSCI")
        .then(res=>res.json())
        .then(json=>console.log(json));
        
}


module.exports = {prof_scraper:prof_scraper,albert_scraper};
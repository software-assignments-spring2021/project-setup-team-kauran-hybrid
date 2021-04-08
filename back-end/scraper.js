const axios=require('axios');
const cheerio=require('cheerio');
const fetch= require('node-fetch');
const nodemon = require('nodemon');
const puppeteer=require('puppeteer');
const Sheets=require('./sheets');
const mongoScript=require('./mongo/mongo.js');

//scraper for rateMyProf using only puppeteer
const prof_scraper=async(prof,ischool)=>{

    const profName=prof
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
    await page.waitForTimeout(5000);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(5000);
    const res=(await page.$$('a'));
    await page.waitForTimeout(500);

    const results=[];
    for(result of res){
        let thisRes=await page.evaluate(el=>el.textContent,result);
        if(thisRes){
            results.push([thisRes]);
        }
    }
  
  let wantedRow=results[2][0];
  wantedRow=wantedRow.replace(/[a-zA-Z]/g, '');

  const quality=wantedRow.substring(0, 3);
  // ratingNumbs isn't 100% correct, but I am not sure if we need it anyway
  let ratingNums=wantedRow.substring(3, 7);
  ratingNums=ratingNums.replace(/\s/g, '');
  ratingNums=ratingNums.replace(/'.'/g, '');

  const splinter=wantedRow.split(' ');
  let takeAgain;
  for (cell in splinter) {
        if (cell>0&&splinter[cell]!='') {
        takeAgain=splinter[cell];
        break;
        }
    }  
    let difRow=wantedRow.replace(/\s/g, '');
    let difficulty=difRow.substring(difRow.length-3,difRow.length);

    console.log("quality "+quality);
    console.log("difficulty "+difficulty);
    console.log("number of ratings "+ratingNums);
    console.log("would take again "+takeAgain);
    
    return({q:quality,r:ratingNums,d:difficulty,t:takeAgain});

}

//hybrid puppeteer + cheerio model, obselete as of now.
//Do not write unit tests for this!!!!!!!!!!!!!!!!!!!!
const cheerio_prof=async(parameters)=>{
    const profName="Amos Bloomberg";
    const school="New York University";
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    page. setDefaultTimeout (100000)
    //this goes to nyu school page on RMP
    await page.goto('https://www.ratemyprofessors.com/campusRatings.jsp?sid=675');
    //select input
    await page.waitForSelector('input');

    const inputProf=(await page.$$('input'))[1];

    //type profName
    await inputProf.type(profName);
    //press down and then enter

    await page.waitForTimeout(500);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);
    let url=await page.url();

    const res=await fetch(url);
    const text=await res.text();
    const $ =cheerio.load(text);
    const containers=$('div').toArray();

    const mapping=containers.map(c=>{
        const active=$(c);
        const score=active.find('.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2 fJKuZx').text();
    })
    console.log(containers);;
}

//scraper for Albert, might use BUGs NYU api
const albert_scraper=async(parameters)=>{

    const year=2021;
    const semester='sp';
    const subject='MATH';
    const school='UA';

    const url = `https://schedge.a1liu.com/${year}/${semester}/${school}/${subject}`;
    const result=await fetch(url)
        .then(res=>res.json())
    const sheets = new Sheets();

    for (key in result) {
        // Loop through each class
        const sections = result[key].sections;
        for (s in sections) {
            const class_name = result[key].name;
            //console.log(class_name);
            const deptCourseId = result[key].deptCourseId;
            //console.log(deptCourseId);
            const section = sections[s];
            const lectures = section.meetings;
            const instructors = section.instructors;
            //console.log(instructors);
            const lectureCode = section.code;
            //console.log(lectureCode);
            const status = section.status;
            //console.log(status);
            const lecLocation = section.location;
            //console.log(lecLocation);
            //const lecTime = lectures[0].beginDate.substring(11, 16);
            const lecTime = lectures[0].beginDate;
            //console.log(lecTime);

            //mongoDb should insert here!!!!!!!!!!!!!!!!!!!!!!!!!
            //instead of google sheets api
            await sheets.load();
            await sheets.addRow(
            {
                'className': class_name,
                'deptCourseId': deptCourseId,
                'lectureCode': lectureCode,
                'instructors': instructors,
                'lectureTime': lecTime,
                'lectureLocation': lecLocation,
                'status': status
                }
            );
            
            const recitations = section.recitations;
            // Loop through each recitation for a class
            for (i in recitations) {
                const recitation = recitations[i];
                const recitationCode = recitation.code;
                //console.log(recitationCode);
                const recitationInstructors = recitation.instructors;
                //console.log(recitationInstructors);
                //const recTime = recitation.meetings[0].beginDate.substring(11, 16);
                const recTime = recitation.meetings[0].beginDate;
                //console.log(recTime);
                const recLocation = recitation.location;
                //console.log(recLocation);
                await sheets.load();
                await sheets.addRow(
                    {
                        'recitationCode': recitationCode,
                        'recitationInstructors': recitationInstructors,
                        'recitationTime': recTime,
                        'recitationLocation': recLocation
                    }
                );
            }   
        }
    }
    console.log('done');
    return result;
}

module.exports = {
  prof_scraper: prof_scraper,
  albert_scraper: albert_scraper,
  cheerio_prof: cheerio_prof,
};

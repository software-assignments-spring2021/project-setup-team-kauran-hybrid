const axios=require('axios');

const cheerio=require('cheerio');

const fetch= require('node-fetch');
const nodemon = require('nodemon');

const puppeteer=require('puppeteer');

const Sheets=require('./sheets');

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
    console.log('yes 0');
    // const year=2021;
    const semester='su';
    const subject='MATH';
    // const schools_url = 'https://schedge.a1liu.com/schools';
    // const schools_result=await fetch(schools_url)
    //     .then(res=>res.json())

    // const schools_list = Object.keys(schools_result);
    const school='UA';

    // for (school in schools_list) {
        // must have 'query=something' at the end for the API to run properly
        // const url = `https://schedge.a1liu.com/${year}/${semester}/search?query=${school}&full=true`;
        const url1 = `https://schedge.a1liu.com/current/${semester}/search?query=${school}/${subject}&full=true`;
        // const result=await fetch(url)
        //     .then(res=>res.json())
        console.log('yes 1');
        const result=await fetch(url1)
            .then(res=>res.json())
        const sheets = new Sheets();
        console.log('yes 2');
        for (key in result) {
            // const subject_code = result[key].subjectCode;
            const class_name = result[key].name;
            const deptCourseId = result[key].deptCourseId;
            const sections = result[key].sections;
            
            for (section in sections) {
                const lecture = section.meetings;
                const recitations = section.recitations;
                for (recitation in recitations) {
                    await sheets.load();
                    await sheets.addRow(
                        {
                            'className': class_name,
                            'deptCourseId': deptCourseId,
                            'lectureCode': sections[section].code,
                            'lectureBeginDate': lecture.beginDate,
                            'lectureDuration': lecture.minutesDuration,
                            'lectureEndDate': lecture.endDate,
                            'recitationCode': recitation.code,
                            'recitationDuration': recitation.minutesDuration,
                            'recitationEndDate': recitation.endDate,
                            'location': sections[section].location
                        }
                    );
                }
                
            }
        }
    // }
    
    // console.log(result);
    // console.log(subject_code);
    // console.log(sections);
    
    return result;
}


module.exports = {
  prof_scraper: prof_scraper,
  albert_scraper: albert_scraper,
  cheerio_prof: cheerio_prof,
};

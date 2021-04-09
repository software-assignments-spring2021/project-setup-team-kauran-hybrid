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
    page. setDefaultTimeout (1000000)
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

    // await page.click('div.TeacherCard__StyledTeacherCard-syjs0d-0.dLJIlx');
    
    //span.Tag-bs9vf4-0.hHOVKF
    const res=(await page.$$('a'));
    await page.waitForTimeout(500);
    //console.log(res);
    // const [response] = await Promise.all([
        
    //     page.waitForNavigation() // This will set the promise to wait for navigation events
    //   // Then the page will be send POST and navigate to target page
    //   ]);
    

    const results=[];
    for(result of res){
        let thisRes=await page.evaluate(el=>el.textContent,result);
        if(thisRes){
            results.push([thisRes]);
        }
    }

    console.log(page.url());
  
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

    await page.$eval('div a.TeacherCard__StyledTeacherCard-syjs0d-0.dLJIlx', el => el.click())
    await page.waitForTimeout(5000);

    let urls = await page.evaluate(() => {
        let l = [];
        let items = document.querySelectorAll('span.Tag-bs9vf4-0.hHOVKF');
        items.forEach((item) => {
            l.push(item.innerText);
        });
        
        return l;
    })
    browser.close();
    return({q:quality,r:ratingNums,d:difficulty,t:takeAgain,tags:urls});

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

    for (key in result) {
        // Loop through each class
        const sections = result[key].sections;
        for (s in sections) {
            const class_name = result[key].name;
            const deptCourseId = result[key].deptCourseId;
            //console.log(deptCourseId);
            const section = sections[s];
            const lectureCode = section.code;
            //console.log(lectureCode);
            const lecName = subject + '-' + school + ' ' + deptCourseId + ' ' + class_name;
            //console.log(lecName);
            const lectures = section.meetings;
            const instructors = section.instructors;
            //console.log(instructors);
            const status = section.status;
            //console.log(status);
            const lecLocation = section.location;
            //console.log(lecLocation);

            var lecTimeStamp = 'N/A';
            var lecStartTime = 'N/A';
            var lecTime = 'N/A';
            var lecDate = 'N/A';
            var lecDay = 'N/A';
            if (lectures !== null) {
                lecTimeStamp = lectures[0].beginDate;
                var d = new Date(lecTimeStamp);
                lecStartTime = lectures[0].beginDate.substring(11, 16);
                lecDate = d.getDay();
                if (lecDate == 1) {
                    lecDay = 'Mon';
                }
                else if (lecDate == 2) {
                    lecDay = 'Tue';
                }
                else if (lecDate == 3) {
                    lecDay = 'Wed';
                }
                else if (lecDate == 4) {
                    lecDay = 'Thu';
                }
                else if (lecDate == 5) {
                    lecDay = 'Fri';
                }
                lecTime = lecDay + ' ' + lecStartTime;
            }
            //console.log(lecTime);
            
            const recitations = section.recitations;
            // Loop through each recitation for a class
            for (i in recitations) {
                const recitation = recitations[i];
                const recitationCode = recitation.code;
                //console.log(recitationCode);
                const recitationInstructors = recitation.instructors;
                //console.log(recitationInstructors);
                const status = section.status;
                //console.log(status);
                const recMeeting = recitation.meetings;
                //console.log(recTime);
                const recLocation = recitation.location;
                //console.log(recLocation);

                var recTimeStamp = 'N/A';
                var recStartTime = 'N/A';
                var recTime = 'N/A';
                var recDate = 'N/A';
                var recDay = 'N/A';
                if (recMeeting !== null) {
                    recTimeStamp = recMeeting[0].beginDate;
                    var d = new Date(recTimeStamp);
                    recStartTime = recMeeting[0].beginDate.substring(11, 16);
                    recDate = d.getDay();
                    if (recDate == 1) {
                        recDay = 'Mon';
                    }
                    else if (recDate == 2) {
                        recDay = 'Tue';
                    }
                    else if (recDate == 3) {
                        recDay = 'Wed';
                    }
                    else if (recDate == 4) {
                        recDay = 'Thu';
                    }
                    else if (recDate == 5) {
                        recDay = 'Fri';
                    }
                    recTime = recDay + ' ' + recStartTime;
                }
                //console.log(recTime);
            }   
        }
    }
    return result;
}

module.exports = {
  prof_scraper: prof_scraper,
  albert_scraper: albert_scraper,
  cheerio_prof: cheerio_prof,
};

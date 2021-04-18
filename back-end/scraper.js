const express = require("express");
const router = express.Router();
const axios=require('axios');
const cheerio=require('cheerio');
const fetch= require('node-fetch');
const nodemon = require('nodemon');
const puppeteer=require('puppeteer');
const mongoScript=require('./mongo/mongo.js');
const dotenv=require('dotenv');




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
    const results=[];
    for(result of res){
        let thisRes=await page.evaluate(el=>el.textContent,result);
        if(thisRes){
            results.push([thisRes]);
        }
    }
    //geting quality score
    let rats=await page.$$('div.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.fJKuZx');
    let ratings=[];
    for(rat of rats){
        let thisRat=await page.evaluate(el=>el.textContent,rat);
        if (thisRat){
            ratings.push(thisRat);
        }
    }
    const quality=ratings[0];
    //console.log(ratings);
    //getting nubmer of ratings
    rats=await page.$$('div.CardNumRating__CardNumRatingCount-sc-17t4b9u-3.jMRwbg');
    ratings=[];
    for(rat of rats){
        let thisRat=await page.evaluate(el=>el.textContent,rat);
        if (thisRat){
            ratings.push(thisRat);
        }
    }
    const ratingNums=ratings[0];
    //console.log(ratings);
    //getting would tak again and difficulty
    rats=await page.$$('div.CardFeedback__CardFeedbackNumber-lq6nix-2.hroXqf');
    ratings=[];
    for(rat of rats){
        let thisRat=await page.evaluate(el=>el.textContent,rat);
        if (thisRat){
            ratings.push(thisRat);
        }
    }
     
    const takeAgain=ratings[0];
    const difficulty=ratings[1];
    //console.log(ratings);
    //console.log(page.url());
    console.log("quality "+quality);
    console.log("difficulty "+difficulty);
    console.log("There are "+ratingNums);
    console.log("would take again "+takeAgain);

    await page.$eval('div a.TeacherCard__StyledTeacherCard-syjs0d-0.dLJIlx', el => el.click())
    await page.waitForTimeout(5000);

    const urls = await page.evaluate(() => {
        let l = [];
        let items = document.querySelectorAll('span.Tag-bs9vf4-0.hHOVKF');
        // items.forEach((item) => {
        //     l.push(item.innerText);
        // });
        for (let i=0;i<5;i++){
            l.push(items[i].innerText);
        }
        
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

    const url = `https://schedge.a1liu.com/current/${semester}/${school}/${subject}`;
    const result=await fetch(url)
        .then(res=>res.json())
    
    

    for (key in result) {
        // Loop through each class
        // console.log(result[key])
        const sections = result[key].sections;
        let sec;
        for (s in sections) {
            let recs=[];
            const lecName = result[key].name;
            // console.log(lecName);
            const deptCourseId = result[key].deptCourseId;
            //console.log(deptCourseId);
            const section = sections[s];
            // console.log(section);
            let lectureCode = section.code;
            lectureCode = lectureCode.replace(/^0+/, '');
            //console.log(lectureCode);
            const lecNum = subject + '-' + school + deptCourseId;
            // console.log(lecNum);
            const lectures = section.meetings;
            const instructors = section.instructors;
            //console.log(instructors);
            const lecStatus = section.status;
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
                    lecDay = 'Mon, Wed';
                }
                else if (lecDate == 2) {
                    lecDay = 'Tue, Thu';
                }
                else if (lecDate == 3) {
                    lecDay = 'Mon, Wed';
                }
                else if (lecDate == 4) {
                    lecDay = 'Tue, Thu';
                }
                else if (lecDate == 5) {
                    lecDay = 'Fri';
                }
                lecTime = lecDay + ' ' + lecStartTime;
            }
            //console.log(lecTime);
            let rec;
            // Get all recitations for a section
            const recitations = section.recitations;
            // Loop through each recitation for a class
            for (i in recitations) {
                const recitation = recitations[i];
                let recitationCode = recitation.code;
                recitationCode = recitationCode.replace(/^0+/, '');
                //console.log(recitationCode);
                const recitationInstructors = recitation.instructors;
                //console.log(recitationInstructors);
                const recStatus = section.status;
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
                        recDay = 'Mon, Wed';
                    }
                    else if (recDate == 2) {
                        recDay = 'Tue, Thu';
                    }
                    else if (recDate == 3) {
                        recDay = 'Mon, Wed';
                    }
                    else if (recDate == 4) {
                        recDay = 'Tue, Thu';
                    }
                    else if (recDate == 5) {
                        recDay = 'Fri';
                    }
                    recTime = recDay + ' ' + recStartTime;
                }
                //console.log(recTime);
                rec = {
                    recCode:recitationCode,
                    recInstructors:recitationInstructors,
                    recStatus:recStatus,
                    recTime:recTime,
                    recLoc: recLocation
                }
                recs.push(rec);
            }
            sec = {
                secCode:lectureCode,
                secYear:year,
                secSem:semester,
                secInstructors:instructors,
                secStatus:lecStatus,
                secTime:lecTime,
                secLoc:lecLocation,
                recs:recs
            }
            
            await mongoScript.mongoSaveSections(lecNum,lecName,sec);  
        }
    }
    return result;
}

router.get("/", (req,res, next) => {
    albert_scraper();
    res.send('scraping');
  })

module.exports = {
  prof_scraper: prof_scraper,
  albert_scraper: albert_scraper,
  cheerio_prof: cheerio_prof,
  router:router,
};

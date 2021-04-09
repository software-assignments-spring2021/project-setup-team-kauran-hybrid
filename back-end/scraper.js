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
                const status = section.status;
                //console.log(status);
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

import React from "react";
import './MenuBar.css';
import ProfInfo from'./ProfInfo';
import {Link} from 'react-router-dom';
import './Professor.css';
import Course from './Course';
import './ClassModules.css';
import ClassModules from './ClassModules';

const Professor=(props)=>{
    
    
    // console.log(JSON.parse(cur))
    const rate = props.details.rate + ' / 5'
    const difficulty = props.details.difficulty + ' / 5'
    const retake = props.details.retake
    const HashTags = props.details.tags
    
    // const classes = [props.details.class1, props.details.class2]
    let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

    if (!is_mobile) {
      const Item = (props) => {
        return (
          <article className="prof-article">
            <h1 className="prof-h1">{props.heading}</h1>
            <p className="Score">{props.paragraph}</p>
          </article>
        )
      }
      return(
        <div>
          

                <center className="Name">
                    {props.details._id}
                </center>
                
                <section>
                    <Item heading="Overall Rating" paragraph={rate}></Item>
                    <Item heading="Level of Difficulty" paragraph={difficulty}></Item>
                    <Item heading="Would take again" paragraph={retake}></Item>
                </section>

                <section>
                        Top #HashTags:
                </section>

                <section>
                    
                    {HashTags.map(item => (
                        <h2 className='prof-h2'>
                            {item}
                        </h2>
                    ))}
                    

                </section>

                <section>
                      Offered Classes:
                </section>

                <ClassModules page='professors'></ClassModules>
                {/* {classes.map(item => (
                  <div className="search-item">
                  <Link to ="./ClassInfo" >Course Name: {item.class_name}{"\t"}|{"\t"}Course Number: {item.class_num}</Link>
                  </div>
                ))} */}
                
                
            </div>
          
      )
    }

    else {
      const Item = (props) => {
        return (
          <article className="prof-article-1">
            <h1 className="prof-h1-1">{props.heading}</h1>
            <p className="Score-1">{props.paragraph}</p>
          </article>
        )
      }
      return(
        <div>
          

                <center className="Name-1">
                    {props.details._id}
                </center>
                
                <section className='section-1'>
                    <Item heading="Overall Rating" paragraph={rate}></Item>
                    <Item heading="Level of Difficulty" paragraph={difficulty}></Item>
                    <Item heading="Would take again" paragraph={retake}></Item>
                </section>

                <section className='section-1'>
                        Top #HashTags:
                </section>

                <center>
                <section className='section-1'>
                    
                    {HashTags.map(item => (
                        <h2 className='prof-h2-1'>
                            {item}
                        </h2>
                    ))}
                    

                </section>
                </center>

                <section className='section-1'>
                      Offered Classes:
                </section>

                <ClassModules page='professors'></ClassModules>
                {/* {classes.map(item => (
                  <div className="search-item">
                  <Link to ="./ClassInfo" >Course Name: {item.class_name}{"\t"}|{"\t"}Course Number: {item.class_num}</Link>
                  </div>
                ))} */}
                
                
            </div>
          
      )
    }

      
    
};




export default Professor;
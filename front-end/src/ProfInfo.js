import logo from './logo.svg';
//import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './ProfInfo.css'
import LoginForm from'./LoginForm'
import { Link } from 'react-router-dom';
import ClassModules from'./ClassModules';
// import Button from './Button'
import MenuBar from './MenuBar';

const ProfInfo=(props)=>{
    const Item = (props) => {
        return (
          <article className="prof-article">
            <h1 className="prof-h1">{props.heading}</h1>
            <p className="Score">{props.paragraph}</p>
          </article>
        )
      }
      const HashTags = ["lots of hw", "lecture heavy", "no quiz"]

      const goBack = () => {
        window.history.back();
      }
    
    return(
      <div className="prof-page">
        <MenuBar>

        </MenuBar>
 
          <p>
            Waitlisted?
          </p>
          
          <div>
              <center className="Name">
                  Professor Name
              </center>
              <section>
                  <Item heading="Overall Rating" paragraph="4/5"></Item>
                  <Item heading="Level of Difficulty" paragraph="4/5"></Item>
                  <Item heading="Would take again" paragraph="40%"></Item>
              </section>
              <section>
                      Top #HashTags:
              </section>
              <section>
                  
                  {HashTags.map(item => (
                      <h2>
                          {item}
                      </h2>
                  ))}
              </section>
              <section>
                     Offered Classes:
              </section>
              {/* <section> */}
              <ClassModules></ClassModules>
              {/* </section> */}
              <center>
              
                  <Link to='./ClassInfo'>
                  <button className='Button' onclick={goBack}>Go Back</button>
                  </Link>
              </center>
              
          </div>

          
        {/* </header> */}
        
      </div>
    )
    

      
    
};




export default ProfInfo;
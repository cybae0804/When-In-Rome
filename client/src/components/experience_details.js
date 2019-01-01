import React from 'react'
import Image1 from '../assets/images/japanfisherman.jpg'
import '../assets/css/experience_details.css'
import Calendar from 'react-calendar'

export default ()=>{
    return(
      <div className='topMargin'>
        {/* <div className="ui grid container"> */}
          <div className="ui image rounded container">
              <img src={Image1}/>
          </div>
        {/* </div> */}
            <div className="ui relaxed list container">
              <div className = "item">
                <i className= 'icon map marker alternate large' id = 'detailsIcon'></i>
                Mexico
              </div>
              <div className="item">
                <i className="icon dollar sign large" id = 'detailsIcon'></i>
                1 billion dollars
              </div>
              <div className="item">
                <i className="icon clock outline large" id = 'detailsIcon'></i>
                Whenever you want, baby!
              </div>
              <div className="item">
                <i className="icon users large" id = 'detailsIcon'></i>
                As many as you want!
              </div>
              <div className="item">
                <i className="icon id badge large" id = 'detailsIcon'></i>
                Cy Bae
              </div>
          </div>
          <div className="ui container">
            <h2 className = 'host'>
              Host
            </h2>
            <p>My name is Cy Bae and I like weird CSS libraries.</p>
            <h2 className = 'host'>
              Activity
            </h2>
            <p>Making people change their code from whatever CSS library they were using before over to some new obscure library.</p>
          </div>
          <div>
          <Calendar/>
          </div>
        </div>
        
    )
}
import React from 'react'
// import User from '../../../dist/assets/images/user.jpg';

export default props=>{
  return (
      <div className="ui divided items container">
        <div className="item">
          <div className="content">
            {/* <img className="ui avatar image" src={User}/> */}
            <a className="header">Reviewer Name</a>
            <div className="meta">
              <span>
                <i className='star icon'></i>
                <i className='star icon'></i>
                <i className='star icon'></i>
                <i className='star icon'></i>
              </span>
              </div>
            <div className="description">
              <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
            </div>
            <div className="extra">
              <div className="ui label">Lorem Ipsum</div>
            </div>
          </div>
          </div>
      </div>
    );
}
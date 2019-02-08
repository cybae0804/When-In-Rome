import React from 'react';
import './index.css';

// each entry is a paragraph
const description = [
	'When traveling we often only do the tourist activities. We walk away with a one dimensional experience that doesn’t reflect the rich local culture and daily life. On the other hand, many locals would love to meet foreign travelers, make new friends, and a little extra cash in the process.',
	'When in Rome seeks to offer an authentic experience by connecting local hosts with travelers. Users can sign up for an experience and join a host in their daily life - commuting, working, or having drink at the local dive bar.'
];

const contributors = [
	{
		firstName: 'Cy',
		lastName: 'Bae',
		github: 'https://github.com/cybae0804',
		linkedin: 'https://www.linkedin.com/in/cybae0804/',
		portfolio: 'http://cybae.co',
		imgUrl: 'https://media.licdn.com/dms/image/C4D03AQHG3Q5PODKQAQ/profile-displayphoto-shrink_200_200/0?e=1554940800&v=beta&t=NGkKPhDAfw7M_URY016DlKYZ7cHaJw8qgdA3CrmgJD8'
	},
	{
		firstName: 'Ben',
		lastName: 'Levine',
    github: 'https://github.com/benlevine1',
		linkedin: 'https://www.linkedin.com/in/benjamin-levine-261b9361/',
		portfolio: '',
		imgUrl: 'http://picsum.photos/401'
	},
	{
		firstName: 'Erick',
		lastName: 'Brownfield',
		github: 'https://github.com/hapachino',
		linkedin: 'https://www.linkedin.com/in/erickbrownfield/',
		portfolio: 'http://erickbrownfield.com',
    imgUrl: 'https://media.licdn.com/dms/image/C5603AQHH_L_tOhC7Hw/profile-displayphoto-shrink_200_200/0?e=1554940800&v=beta&t=o2Po8cn_C7Os7taQkjYtntyU2zbInTxtdRzFcQz5tjY'
	}
];

// wrapped in an object for if we add icons or extra info down the road
const technology = [
	{
		name: 'MySQL'
	},
	{
		name: 'Express'
	},
	{
		name: 'React'
	},
	{
		name: 'Redux'
	},
	{
		name: 'Node'
	},
	{
		name: 'Semantic UI'
	},
	{
		name: 'oAuth'
	},
	{
		name: 'Passport'
	},
	{
		name: 'AWS S3'
	},
];

export default props => (
	<div className='container ui text aligned'>
		<h1 className='ui horizontal header'>When In Rome...</h1>
		<div>
			{description.map( (paragraph, index) => (<p key={index}>{paragraph}</p>))}
		</div>

		<h3 className='ui horizontal divider header topMargin'>Contributors</h3>
		<div className='ui three stackable cards topMargin'>
			{contributors.map( (item, index) => (
				<div key={index} className='ui card'>
					<div className='image'>
						<img src={item.imgUrl} />
					</div>
					<div className='content'>
						<div className='header'>{`${item.firstName} ${item.lastName}`}</div>
					</div>
					<div className="ui bottom attached buttons">
						<a target="_blank" href={item.portfolio} className="ui icon circular button">
							<i className="user icon"></i>
						</a>
  					<a target="_blank" href={item.linkedin} className="ui icon linkedin circular button">
							<i className="linkedin icon"></i>
						</a>
  					<a target="_blank" href={item.github} className="ui icon circular black button">
							<i className="icon github"></i>
						</a>
					</div>
				</div>
			))}
		</div>

		<h3 className='ui horizontal divider header topMargin'>Built With</h3>
    <div className="ui middle aligned divided massive relaxed horizontal list center">
			{
				technology.map( (item, index) => (
					<div key={index} className="item">
						<div className="content">
							<span className="header">{item.name}</span>
						</div>
					</div>
				))
			}
		</div>
	</div>
)
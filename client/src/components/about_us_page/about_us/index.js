import React from 'react';
import './index.css';

const description = [
	'When traveling we often only do the tourist activities. We walk away with a one dimensional experience that doesn’t reflect the rich local culture and daily life. On the other hand, many locals would love to meet foreign travelers, make new friends, and a little extra cash in the process.',
	'When in Rome seeks to offer an authentic experience by connecting local hosts with travelers. Users can sign up for an experience and join a host in their daily life - commuting, working, or having drink at the local dive bar.'
];

const contributors = [
	{
		firstName: 'Cy',
		lastName: 'Bae',
		github: '',
		linkedin: '',
		portfolio: '',
		imgUrl: 'http://picsum.photos/400'
	},
	{
		firstName: 'Ben',
		lastName: 'Levine',
		github: '',
		linkedin: '',
		portfolio: '',
		imgUrl: 'http://picsum.photos/401'
	},
	{
		firstName: 'Erick',
		lastName: 'Brownfield',
		github: '',
		linkedin: '',
		portfolio: '',
		imgUrl: 'http://picsum.photos/402'
	}
];

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
	<div className='container ui aligned center'>
		<h1 className='ui horizontal header topMargin'>When In Rome...</h1>
		<div className='container ui text'>
			{description.map( (paragraph, index) => (<p key={index}>{paragraph}</p>))}
		</div>

		<h1 className='ui horizontal divider header topMargin'>Contributors</h1>
		<div className='ui three stackable cards'>
			{contributors.map( (item, index) => (
				<div key={index} className='ui card'>
					<div className='image'>
						<img src={item.imgUrl} />
					</div>
					<div className='content'>
						<div className='header'>{`${item.firstName} ${item.lastName}`}</div>
					</div>
					<div className="ui bottom attached buttons">
						<button className="ui icon circular button">
							<i className="user icon"></i>
						</button>
  					<button className="ui icon linkedin circular button">
							<i className="linkedin icon"></i>
						</button>
  					<button className="ui icon circular black button">
							<i className="icon github"></i>
						</button>
					</div>
				</div>
			))}
		</div>

		<h1 className='ui horizontal divider header topMargin'>Built With</h1>
		<div className="ui middle aligned divided massive relaxed horizontal list">
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
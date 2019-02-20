# When In Rome...

### Overview

When in Rome is a mobile-first application that seeks to offer an authentic experience by connecting local hosts with travelers. Users can sign up for an experience and join a host in their daily life - commuting, working, or having drink at the local dive bar. 

[Live Demo](https://wheninrome.live)

### Collaborators
- Ben Levine
- Cy Bae
- Erick Brownfield

### Setup Instructions

> 1. Import database
>    - Import `config/rome.sql`
> 1. Create user-specific keys and login files
>    - `cd` to `/config`
>    - copy and rename with `.js` extension: `db.template`, `keys.template`, `oauth.template`, `s3.template`
>    - fill out empty fields
> 1. Install server dependencies 
>    - `cd` to `/`
>    - `npm install`
> 1. Install client dependencies 
>    - `cd` to `/client`
>    - `npm install`
> 1. Start dev server
>    - `cd` to `/`
>    - `npm start`
> 1. Open a browser and navigate to `localhost:3000` 

### Bundle For Deployment

> 1. Run webpack to bundle files
>    - `npm run bundle`
> 
> **NOTE:** *After bundling you can not directly run your app locally. You must run your app from the root directory of a server.*

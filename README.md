# item_lister

### Description  
A website made using *Vuejs* for the frontend. Items can added with custom names/amounts/images to the database. Quantities can be changed on existing items or items may be deleted. API calls are to the backend which is *Nodejs*. A bare repos on my Raspberry Pi allows me to use git to deploy to the Pi with a git hook. The *Nodejs* *systemd* service keeps the node server running and serving the static files built from the *vue-cli* process described below (or look at the *post-update* script which is the git hook). My Pi already had a running *lighttpd* server due to *PiHole*. *PiHole*'s *FTLDNS* also easily allowed me to add a custom simple name domain entry which is proxy passed by the *lighttpd* web server to the node process running on a different port. Firewall ports opened via *ufw*.

### Local testing  
- Change ip in constants.js to localhost
- cd to server/ and run *./createDatabase.js*
- vue ui --headless
- Go to localhost:8000 for vue ui interface
- Go to tasks and start serve:bs and serve:api to start webpack-dev-server proxied to by browsersync and the api nodejs server
- Go to localhost:8080 to see live reloaded site
- Nodemon will reload node server if index.js changes
- Deploy to raspberry pi with *git push deploy master*

### Two package.json:  
server:  
    index.js (express server for responding to API requests to manage items)  
    node_modules(cors,multer,expressjs,)  
    
client:  
    vue-cli output built static files


### TODO:   
ufw rules on pi need updating for port 80 traffic only from local network


### Notes:  
- Added domain/local/expand-hosts option to new dnsmasq conf file at  /etc/dnsmasq.d/02-custom-local-hosts.conf for "home" domain
- Added some ipv4/6 names to /etc/hosts which also work with "home" domain above (pi.home)
- Added HOST check to /etc/lighttpd/external.conf to check if the name from the previous step is the current one and proxy pass to nodejs server
- Also added server.module mod_proxy in external.conf so proxying will work
- Add systemd service file to /etc/systemd/system/item_lister-nodejs.service to auto start and restart nodejs server 


### Pihole
- FTL is dnsmasq + extras. Manage some dns before forwarding upstream
- Responds with Pi IP for ads. /var/www/html/pihole/index.php served for 404 pages in lighttpd.conf
- Block page and reason why if blacklisted website.
- Transparant image for iframes, dummy js for js,etc.
- Re-direct to admin page if HOST is pi.hole
- /etc/hosts names and raspberrypi give a "domain not on blacklist" blocked page. Seems to be the default if it can find it on whitelist or blacklist and no file in url path..
- p.s raspberrypi etc. try get index file but cant find so it triggers 404 error which gets index.php from pihole as mentioned above

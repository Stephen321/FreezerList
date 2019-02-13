# item_lister

### Local testing  
- Change ip in constants.js to localhost
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

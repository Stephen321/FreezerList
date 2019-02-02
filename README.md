# item_lister


### NOTE:  

All api calls from the client that change server state will not update locally on the
client until a response comes back from the server. For adding an item this response
is crucial as it contains the image path and id of the newly added item. (could display
item anyway before server response with data urls)


### TODO:

bare git repos on Pi to deploy to (/srv/git/item_lister.git)
    want to do git push deploy master from local version of repos...
    also want to be able to refer to 192.168.1.7 (static pi address) as just "pi"
post-update to checkout to /srv/node/item_lister and build or whatever but nodejs application will be running with this dir as root (pm2 vs systemd?)
lighttpd (already installed by pihole....) vs nginx to server static files from /srv/node/item_lister? )or different directory...)

192.168.1.7 is static in router settings
router dhcp should configure devices to use pi as the dns 
    pi will run pihole which uses dnsmasq to manage dns requests (blocks ads) (and it manages dnsmasq config files (such as which forwarder dns it should use))
    lighttpd for admin page 
all dns requests to pi and somehow have custom domains for local devices/services
    //https://discourse.pi-hole.net/t/howto-using-pi-hole-as-lan-dns-server/533
    192.168.1.7 -> pi
    ":2323 -> adminPage
    ":7123 -> lighttpd item freezer -> non static proxied to nodejs 
    *black listed domains get 192.168.1.7 (pi's ip returned) so client would connect to lighttpd webserver on port 80 to get /ad.gif or whatever?*
keep-alive:    
    nodejs is kept alive by pm2/systemd
    lighttpd? systemd, default prob works
    pihole? systemd? default works?
    
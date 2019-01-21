# item_lister


### NOTE:  

All api calls from the client that change server state will not update locally on the
client until a response comes back from the server. For adding an item this response
is crucial as it contains the image path and id of the newly added item. (could display
item anyway before server response with data urls)
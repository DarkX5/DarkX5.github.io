/* About the script 
 *  Purpose : WebView Widget with refresh 
 *  Author : Jappie Toutenhoofd ( https://plus.google.com/+JappieToutenhoofd) 
 *  Link: https://plus.google.com/+JappieToutenhoofd/posts/KgcWsg7F9CP
 */

var refresh_interval_minutes = 60;

var myItem = LL.getEvent().getItem();
var myId   = myItem.getId();
var myView = myItem.getView();

function refreshWV() 
{ // prevent event flooding
  var nu   = new Date();
  var last = myItem.getTag(myId)||0;

  if ((nu - last) > (refresh_interval_minutes *60000))
  { //myView.reload(); <-- seams to crash when it failed to load before.
    //myView.loadUrl(myView.getUrl()); <-- alternative, if everything else fails
    myView.loadUrl( "javascript:window.location.reload( true )" );
    myItem.setTag(myId, nu);
  }  
  // store the timeout id so that it can be cleared when pausing the item
    myItem.setTag("WV", setTimeout(refreshWV, 30000));

} 

refreshWV();
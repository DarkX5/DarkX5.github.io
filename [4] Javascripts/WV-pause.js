/* About the script 
 *  Purpose : WebView Widget with refresh 
 *  Author : Jappie Toutenhoofd ( https://plus.google.com/+JappieToutenhoofd) 
 *  Link: https://plus.google.com/+JappieToutenhoofd/posts/KgcWsg7F9CP
 */

// important: preserve the battery life and clear timeouts when the item is paused to avoid useless background activity
var id = LL.getEvent().getItem().getTag("WV");
if(id != null) {
    clearTimeout(parseInt(id));
}
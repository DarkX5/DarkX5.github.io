/* About the script 
 *  Purpose : WebView Widget with refresh 
 *  Author : Jappie Toutenhoofd ( https://plus.google.com/+JappieToutenhoofd) 
 *  Link: https://plus.google.com/+JappieToutenhoofd/posts/KgcWsg7F9CP
 */

// webviews work best on first page.
// After resize, reload LL

// usage: check data. and enter:
// zoom;url

LL.bindClass("android.webkit.WebView");
var context = LL.getContext();

var mydata = data.split(";");
var myZoom = 1; // mydata[0];
var myURL  = ""; // mydata[1];

var webView = new WebView(context);
    webView.getSettings().setJavaScriptEnabled(true);
    webView.setInitialScale(myZoom);

//  webView.loadUrl("http://forecast.io/embed/#lat=52.3&lon=4.68&name=Holland&units=ca" );
    webView.loadUrl("http://"+ myURL);  
return webView;
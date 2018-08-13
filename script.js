//Listen for form submit
document.getElementById("myForm").addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e) {

    //Get form values
    var siteName = document.getElementById('websiteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
    //Local Storage test
    localStorage.setItem('test', "hello world");
    localStorage.getItem('test');
    localStorage.removeItem('');
*/
    console.log(siteName);
    console.log(siteUrl)

    //prevent form from submitting
    e.preventDefault();
}
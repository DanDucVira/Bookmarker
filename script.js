//Listen for form submit
document.getElementById("myForm").addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e) {

    //Get form values
    var siteName = document.getElementById('websiteName').value;
    var siteUrl = document.getElementById('siteUrl').value;


    if (!validateForm(siteName, siteUrl)) {
        return false;
    }
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

    //Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {

        //Init array
        var bookmarks = [];
        //add to array
        bookmarks.push(bookmark);
        //set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //get bookmarks form localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        //add bookmark to array
        bookmarks.push(bookmark);

        //re-set back to local stoarage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }
    //clear form
    document.getElementById('myForm').reset();

    //re-fetch bookmarks
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();
}

function deleteBookmark(url) {

    //get bookmarks form localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop thougth bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks();
}
//Fetch bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id
    var bookmarksResults = document.getElementById("bookmarksResults");

    //Build output
    bookmarksResults.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class=" m-3 p-3 bg-success text-white">' +
            '<h3 class="m-3 text-left">' + name +
            '<a class="btn btn-default mz-5 lead  " target="_blank" href="' + url + '">Visit</a>' +
            '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger "  href="#">Delete</a>' +
            '</h3>' +
            '</div>';

    }
}

// Validate Form
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}
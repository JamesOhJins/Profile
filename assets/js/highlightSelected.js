function highlight(){
$(document).ready(function () {
    
    // Get current page URL
    var url = window.location.href;

    // remove # from URL
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));

    // remove parameters from URL
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));

    // select file name
    url = url.substr(url.lastIndexOf("/") + 1);

    // If file name not avilable
    if (url == '') {
        url = 'index.html';
        console.log("URL is not found");
    }
    console.log(url);

    // Loop all menu items
    $('.navLinks li').each(function () {
        console.log("finding href");
        // select href
        var href = $(this).find('a').attr('href');
        console.log(href);
        if(href == '') {
            console.log("Error finding href");
        }
        // Check filename
        if (url == href) {
            console.log("found a match");
            // Add active class
            $(this.children).addClass('selected');
            $(this).parent().parent().addClass('parent');
        }
    });
});
}
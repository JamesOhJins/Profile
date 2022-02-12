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

    // Loop all menu items
    $('.navLinks li').each(function () {
        // select href
        var href = $(this).find('a').attr('href');
        if(href == '') {
            console.log("Error finding href");
        }
        // Check filename
        if (url == href) {
            // Add active class
            $(this.children).addClass('selected');
            // $(this).parent().parent().addClass('parent');
            $(this).parent().closest("li").addClass('parent');
        }
    });
});
}
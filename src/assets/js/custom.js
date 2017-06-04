//close .dropdown-menu on link click
$(document).ready(() => {
    $('ul.dropdown-menu li a, li.dropdown a').click(()=>{
        $('.dropdown-menu').css('display:none');
    })
})

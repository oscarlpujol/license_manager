const checkSite = () => {
    let url = window.location.pathname;
    try{
        if (url === '/') {
            document.getElementById('linkIndex').style.textDecoration = "underline";
        }
        else if (url.includes('licencias')) {
            document.getElementById('linkActiveLicenses').style.textDecoration = "underline";
        }
        else if (url.includes('solicitudes')) {
            document.getElementById('linkRequests').style.textDecoration = "underline";
        }
        else if (url.includes('usuarios')) {
            document.getElementById('linkUsers').style.textDecoration = "underline";
        }
        else if (url.includes('admin')) {
            document.getElementById('linkManagement').style.textDecoration = "underline";
        }
    }
    catch {}
}

window.addEventListener('DOMContentLoaded', () => {
    checkSite();
})

$(document).ready(function(){
    $('[data-bs-toggle="modal"]').click(function(){
      var iframeSrc = $(this).data('iframe-src');
      $('#iframeContent').attr('src', iframeSrc);
    });
  });
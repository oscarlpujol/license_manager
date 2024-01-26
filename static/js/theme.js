const themeBtn = document.querySelector('.theme');

const getCurrentTheme = () => {
    let theme = window.matchMedia('(prefers-color-scheme: light')
    .matches ? 'dark' : 'light';
    localStorage.getItem('wol.theme') ? theme =
    localStorage.getItem('wol.theme') : null;
    return theme;
}

const loadTheme = (theme) => {
    const root = document.querySelector(':root');
    const table = document.querySelector('.table');
    try{
        table.classList.remove("table-dark");
        table.classList.remove("table-light");
    }
    catch {}
    if(theme === "dark"){
        themeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        try{
        table.classList.add("table-dark");
        }
        catch{}
    }
    else{
        themeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        try{
        table.classList.add("table-light");
        }
        catch{}
    }
    root.setAttribute('color-scheme', `${theme}`);
}

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
    loadTheme(getCurrentTheme());
})

themeBtn.addEventListener('click', () => {
    let theme = getCurrentTheme();
    if(theme === "dark"){
        theme = "light";
    }
    else{
        theme = "dark";
    }
    localStorage.setItem('wol.theme', `${theme}`);
    loadTheme(theme);
})

window.addEventListener('DOMContentLoaded', () => {
    loadTheme(getCurrentTheme());
    checkSite();
})

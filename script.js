document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const githubStatsCard = document.getElementById('github-stats-card');
    const githubLangsCard = document.getElementById('github-langs-card');

    const topNavLinks = document.querySelectorAll('.top-nav .nav-links a');
    const sideNavLinks = document.querySelectorAll('.side-nav .nav-dot');
    const sections = document.querySelectorAll('main section');
    const header = document.querySelector('header');

    // --- LÓGICA DE NAVEGAÇÃO E SCROLL ---

    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    };

    topNavLinks.forEach(link => link.addEventListener('click', smoothScroll));
    sideNavLinks.forEach(link => link.addEventListener('click', smoothScroll));

    const highlightCurrentSection = () => {
        let currentSectionId = '';
        const headerHeight = header.offsetHeight + 50; // Offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        topNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        sideNavLinks.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${currentSectionId}`) {
                dot.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightCurrentSection);

    // --- LÓGICA DE TRADUÇÃO ---
    const setLanguage = (lang) => {
        const elements = document.querySelectorAll('[data-pt][data-en]');
        elements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
        document.title = document.querySelector('title').getAttribute(`data-${lang}`);
        document.documentElement.lang = lang;
        langToggle.textContent = lang === 'pt' ? 'EN' : 'PT';
        localStorage.setItem('lang', lang);
    };

    // --- LÓGICA DO TEMA E GRÁFICOS DO GITHUB ---
    const updateGithubCardTheme = (isDarkMode) => {
        const statsBaseUrl = "https://github-readme-stats.vercel.app/api?username=sophialberton&show_icons=true&include_all_commits=true&count_private=true&hide_border=true";
        const langsBaseUrl = "https://github-readme-stats.vercel.app/api/top-langs?username=sophialberton&layout=compact&hide_border=true";

        if (isDarkMode) {
            const darkThemeParams = "&theme=dracula&title_color=d18681&text_color=f6ebdd&icon_color=acbfb7";
            githubStatsCard.src = statsBaseUrl + darkThemeParams;
            githubLangsCard.src = langsBaseUrl + darkThemeParams;
        } else {
            const lightThemeParams = "&theme=light&title_color=d18681&text_color=111113&icon_color=8e6d86";
            githubStatsCard.src = statsBaseUrl + lightThemeParams;
            githubLangsCard.src = langsBaseUrl + lightThemeParams;
        }
    };

    // --- INICIALIZAÇÃO ---
    const currentTheme = localStorage.getItem('theme') || 'light';
    const isDark = currentTheme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    updateGithubCardTheme(isDark);

    const currentLang = localStorage.getItem('lang') || 'pt';
    setLanguage(currentLang);
    highlightCurrentSection();

    // --- EVENTOS DE CLICK ---
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
        updateGithubCardTheme(isDarkMode);
    });

    langToggle.addEventListener('click', () => {
        const newLang = localStorage.getItem('lang') === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
    });
});
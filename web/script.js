// --- Dicionário de Traduções ---
const translations = {
    en: {
        page_title: "Sophia Alberton - Portfolio",
        nav_about: "About Me",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_contact: "Contact",
        intro_h1: "Hello, World! I'm Sophia!",
        intro_p: "Junior Fullstack Developer",
        about_h2: "About Me",
        about_p: "This is the space to talk about yourself. Your dreams, interests, and passions. 'I am a developer passionate about creating solutions that positively impact people's lives. My dream is...'",
        skills_h2: "Technologies and Skills",
        skills_p: "Based on your README, here are some of the technologies you work with. You can add your soft skills here too!",
        projects_h2: "Projects",
        project1_h3: "EmailRH | Automation",
        project1_p: "A backend project that automates sending birthday emails to company employees.",
        project_button: "View on GitHub",
        stats_h2: "GitHub Stats",
        contact_h2: "Contact",
        contact_p: "Let's talk! You can find me here:",
        footer_p: "© 2024 Sophia Alberton. All rights reserved."
    },
    pt: {
        page_title: "Sophia Alberton - Portfólio",
        nav_about: "Sobre Mim",
        nav_skills: "Habilidades",
        nav_projects: "Projetos",
        nav_contact: "Contato",
        intro_h1: "Olá, Mundo! Eu sou a Sophia!",
        intro_p: "Junior Fullstack Developer",
        about_h2: "Sobre Mim",
        about_p: "Aqui é o espaço para falar sobre si. Os seus sonhos, interesses e paixões. \"Sou uma desenvolvedora apaixonada por criar soluções que impactam positivamente a vida das pessoas. O meu sonho é...\"",
        skills_h2: "Tecnologias e Habilidades",
        skills_p: "Baseado no seu README, estas são algumas das tecnologias com as quais trabalha. Pode adicionar as suas soft skills aqui também!",
        projects_h2: "Projetos",
        project1_h3: "EmailRH | Automação",
        project1_p: "Um projeto de backend que automatiza o envio de emails de aniversário para os colaboradores de uma empresa.",
        project_button: "Ver no GitHub",
        stats_h2: "Estatísticas do GitHub",
        contact_h2: "Contato",
        contact_p: "Vamos conversar! Pode encontrar-me aqui:",
        footer_p: "© 2024 Sophia Alberton. Todos os direitos reservados."
    }
};

// --- Lógica de Troca de Tema e Idioma ---
document.addEventListener('DOMContentLoaded', () => {
    
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    
    // --- Troca de Tema ---
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    });

    // --- Lógica para adaptar os gráficos do GitHub ao tema ---
    const githubStatsCard = document.getElementById('github-stats-card');
    const githubLangsCard = document.getElementById('github-langs-card');

    const updateGithubCardTheme = (isDarkMode) => {
        const statsBaseUrl = "https://github-readme-stats.vercel.app/api?";
        const langsBaseUrl = "https://github-readme-stats.vercel.app/api/top-langs?";

        // Parâmetros comuns
        const commonParams = "&username=sophialberton&show_icons=true&include_all_commits=true&count_private=true&hide_border=true";
        const langsParams = "&username=sophialberton&layout=compact&hide_border=true";

        if (isDarkMode) {
            // Tema para Dark Mode (adaptado à sua paleta)
            const darkThemeParams = "&theme=dracula&title_color=d18681&text_color=f6ebdd&icon_color=acbfb7"; // Usei dracula como base e ajustei cores
            githubStatsCard.src = statsBaseUrl + commonParams + darkThemeParams;
            githubLangsCard.src = langsBaseUrl + langsParams + darkThemeParams;
        } else {
            // Tema para Light Mode (adaptado à sua paleta)
            const lightThemeParams = "&theme=light&title_color=d18681&text_color=111113&icon_color=8e6d86";
            githubStatsCard.src = statsBaseUrl + commonParams + lightThemeParams;
            githubLangsCard.src = langsBaseUrl + langsParams + lightThemeParams;
        }
    };

    // Atualizar o tema dos cards do GitHub no carregamento
    updateGithubCardTheme(currentTheme === 'dark');

    // Adicionar a atualização dos cards do GitHub ao evento de toggle do tema
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
        updateGithubCardTheme(isDarkMode); // Chamada para atualizar os cards
    });

    // --- Troca de Idioma ---
    let currentLang = localStorage.getItem('lang') || 'pt';

    const setLanguage = (lang) => {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
        langToggle.textContent = lang === 'pt' ? 'EN' : 'PT';
        localStorage.setItem('lang', lang);
    };
    
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(currentLang);
    });

    // Definir idioma inicial ao carregar a página
    setLanguage(currentLang);
});
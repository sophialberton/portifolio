document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const githubStatsCard = document.getElementById('github-stats-card');
    const githubLangsCard = document.getElementById('github-langs-card');
    // --- LÓGICA DE NAVEGAÇÃO COM SCROLL SUAVE ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');
    const header = document.querySelector('header');

    // Função de rolagem suave
    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Calcula a posição do topo da seção mais o deslocamento do header
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Adiciona o evento de clique a todos os links da navegação
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Função para destacar o link ativo enquanto rola a página
    const highlightCurrentSection = () => {
        let currentSectionId = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Um pequeno offset extra
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    };

    // Adiciona o evento de scroll na janela
    window.addEventListener('scroll', highlightCurrentSection);
    // --- LÓGICA DE TRADUÇÃO AUTOMATIZADA ---
    const setLanguage = (lang) => {
        // Seleciona todos os elementos que têm traduções
        const elements = document.querySelectorAll('[data-pt][data-en]');
        elements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Traduz o título da página, que é um caso especial
        document.title = document.querySelector('title').getAttribute(`data-${lang}`);

        // Atualiza o atributo 'lang' da tag <html> para acessibilidade
        document.documentElement.lang = lang;

        // Atualiza o texto do botão de troca de idioma
        langToggle.textContent = lang === 'pt' ? 'EN' : 'PT';

        // Guarda a preferência do utilizador no navegador
        localStorage.setItem('lang', lang);
    };

    // --- LÓGICA DO TEMA E GRÁFICOS DO GITHUB ---
    const updateGithubCardTheme = (isDarkMode) => {
        const statsBaseUrl = "https://github-readme-stats.vercel.app/api?username=sophialberton&show_icons=true&include_all_commits=true&count_private=true&hide_border=true";
        const langsBaseUrl = "https://github-readme-stats.vercel.app/api/top-langs?username=sophialberton&layout=compact&hide_border=true";

        if (isDarkMode) {
            // Tema para o Modo Escuro
            const darkThemeParams = "&theme=dracula&title_color=d18681&text_color=f6ebdd&icon_color=acbfb7";
            githubStatsCard.src = statsBaseUrl + darkThemeParams;
            githubLangsCard.src = langsBaseUrl + darkThemeParams;
        } else {
            // Tema para o Modo Claro
            const lightThemeParams = "&theme=light&title_color=d18681&text_color=111113&icon_color=8e6d86";
            githubStatsCard.src = statsBaseUrl + lightThemeParams;
            githubLangsCard.src = langsBaseUrl + lightThemeParams;
        }
    };

    // --- INICIALIZAÇÃO DA PÁGINA ---

    // Define o tema inicial com base no que está guardado ou usa 'light' como padrão
    const currentTheme = localStorage.getItem('theme') || 'light';
    const isDark = currentTheme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    updateGithubCardTheme(isDark); // Atualiza os gráficos do GitHub

    // Define o idioma inicial com base no que está guardado ou usa 'pt' como padrão
    const currentLang = localStorage.getItem('lang') || 'pt';
    setLanguage(currentLang);

    // --- EVENTOS DE CLICK ---

    // Evento para trocar de tema
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
        updateGithubCardTheme(isDarkMode); // Atualiza os gráficos sempre que o tema muda
    });

    // Evento para trocar de idioma
    langToggle.addEventListener('click', () => {
        // Verifica qual é o idioma atual e troca para o outro
        const newLang = localStorage.getItem('lang') === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
    });
});
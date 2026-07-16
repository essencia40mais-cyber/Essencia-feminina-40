/* ==========================================================================
   APP.JS - FRONTEND - ESSÊNCIA FEMININA 40+
   Gerenciamento de Interações, Animações, Menu, Toggle de Preços e Quiz
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================================================
    // 1. MENU MOBILE (HAMBURGUER)
    // ==========================================================================
    const toggleMenu = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-navigation');
    
    if (toggleMenu && nav) {
        toggleMenu.addEventListener('click', () => {
            toggleMenu.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Fechar o menu ao clicar em um link
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 2. TOGGLE MENSAL/ANUAL (Feito 100% no JS - Sem mexer no HTML!)
    // ==========================================================================
    const billingToggle = document.querySelector('.billing-toggle');
    const monthlyLabel = document.querySelector('.label-monthly');
    const annualLabel = document.querySelector('.label-annual');

    if (billingToggle) {
        billingToggle.addEventListener('click', () => {
            // Liga/desliga o botão
            billingToggle.classList.toggle('annual');
            const isAnnual = billingToggle.classList.contains('annual');

            // Muda a cor do texto "Mensal/Anual"
            if (monthlyLabel && annualLabel) {
                monthlyLabel.classList.toggle('active', !isAnnual);
                annualLabel.classList.toggle('active', isAnnual);
            }

            // 1. ESCREVA AQUI O TEXTO QUE VOCÊ QUER QUE APAREÇA EM CADA PLANO:
            // (O primeiro texto é para o Plano 1, o segundo para o Plano 2, etc.)
            const textosDesconto = [
                "13s",   // Plano 1 (Comunidade)
                "10% OFF - Equivalente a R$ 79,10/mês",   // Plano 2 (Caminho Guiado)
                "10% OFF - Equivalente a R$ 140,70/mês",  // Plano 3 (Cuidado Integral)
                "10% OFF - Equivalente a R$ 228,70/mês"   // Plano 4 (Acompanhamento Personal)
            ];

            const pricingContainers = document.querySelectorAll('.plan-pricing');

            pricingContainers.forEach((container, index) => {
                const valueEl = container.querySelector('.value');
                const periodEl = container.querySelector('.period');
                
                // O JS cria o textinho de desconto na hora (sem precisar mexer no HTML ou CSS)
                let discountSub = container.querySelector('.js-discount-subtitle');
                if (!discountSub) {
                    discountSub = document.createElement('div');
                    discountSub.className = 'js-discount-subtitle';
                    
                    // Estilo do textinho (pode mudar as cores e tamanhos aqui se quiser)
                    discountSub.style.fontSize = '0.8rem';
                    discountSub.style.color = '#107c41'; // Verde bonito de desconto
                    discountSub.style.fontWeight = 'bold';
                    discountSub.style.marginTop = '4px';
                    discountSub.style.display = 'none'; // Começa escondido
                    
                    container.appendChild(discountSub);
                }

                if (valueEl) {
                    const priceMensal = container.getAttribute('data-mensal');
                    const priceAnual = container.getAttribute('data-anual');
                    
                    if (isAnnual) {
                        // Quando muda para anual:
                        valueEl.textContent = priceAnual;
                        if (periodEl) periodEl.textContent = '/mês';
                        
                        // Mostra o texto personalizado que você definiu na lista lá em cima
                        discountSub.textContent = textosDesconto[index];
                        discountSub.style.display = 'block';
                    } else {
                        // Quando volta para mensal:
                        valueEl.textContent = priceMensal;
                        if (periodEl) periodEl.textContent = '/mês';
                        
                        // Esconde o texto de desconto
                        discountSub.style.display = 'none';
                    }
                }
            });
        });
    }

    // ==========================================================================
    // 3. ACORDEON DE DÚVIDAS FREQUENTES (FAQ)
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Fecha todas as outras sanfonas antes de abrir a nova
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Se não estava ativa, abre a que foi clicada
                if (!isActive) item.classList.add('active');
            });
        }
    });

    // ==========================================================================
    // 4. LÓGICA DO QUESTIONÁRIO INTELIGENTE (QUIZ)
    // ==========================================================================
    const btnNext = document.getElementById('btn-next-question');
    const btnRestart = document.getElementById('btn-restart-quiz');
    
    if (btnNext) {
        const questions = [
            {
                title: "Qual é o seu principal objetivo de saúde hoje?",
                options: [
                    { text: "Fazer um mapeamento geral e entender meu corpo.", value: "entrada" },
                    { text: "Gerenciar sintomas específicos (sono, menopausa, energia).", value: "regular" },
                    { text: "Transformação completa com acompanhamento diário.", value: "premium" }
                ]
            },
            {
                title: "Qual nível de suporte você sente que precisa neste momento?",
                options: [
                    { text: "Quero diretrizes claras, mas prefiro seguir no meu próprio ritmo.", value: "entrada" },
                    { text: "Preciso de encontros mensais e motivação de uma comunidade.", value: "regular" },
                    { text: "Quero suporte médico VIP, com respostas rápidas.", value: "premium" }
                ]
            },
            {
                title: "Como está sua rotina de exames preventivos?",
                options: [
                    { text: "Faz muito tempo que não faço um check-up detalhado.", value: "entrada" },
                    { text: "Faço o básico, mas sinto que falta uma visão integrativa.", value: "regular" },
                    { text: "Tenho exames recentes, mas quero otimizar minha longevidade.", value: "premium" }
                ]
            }
        ];

        const plans = {
            "entrada": {
                title: "Avaliação Essencial",
                desc: "Seu momento pede clareza. Faremos um mapeamento completo da sua saúde atual, entregando um plano de ação claro.",
                features: ["Mapeamento 360º de Sintomas", "Consulta Inicial de Diagnóstico", "Plano de Ação (PDF)"]
            },
            "regular": {
                title: "Plano Caminho Guiado",
                desc: "Você precisa de constância e acolhimento. O plano Guiado oferece o equilíbrio perfeito entre autonomia e suporte.",
                features: ["Avaliação Inclusa", "Encontros Mensais em Grupo", "Comunidade Exclusiva"]
            },
            "premium": {
                title: "Acompanhamento Personal",
                desc: "Você busca excelência e otimização. Acompanhamento lado a lado com nossa equipe médica e suporte premium.",
                features: ["Consultas Médicas Bimestrais", "Acesso via WhatsApp", "Concierge de Saúde"]
            }
        };

        let currentQuestionIndex = 0;
        let scores = { entrada: 0, regular: 0, premium: 0 };
        let selectedValue = null;

        const questionTitle = document.getElementById('quiz-question-title');
        const optionsGrid = document.getElementById('quiz-options');
        const progressBar = document.getElementById('quiz-progress');
        const questionArea = document.getElementById('quiz-question-area');
        const resultArea = document.getElementById('quiz-result-area');

        function renderQuestion() {
            const question = questions[currentQuestionIndex];
            questionTitle.textContent = question.title;
            optionsGrid.innerHTML = '';
            selectedValue = null;
            btnNext.disabled = true;

            const progress = ((currentQuestionIndex) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;

            const letters = ['A', 'B', 'C'];

            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'quiz-option';
                optionDiv.dataset.value = option.value;
                
                optionDiv.innerHTML = `
                    <div class="quiz-option-letter">${letters[index]}</div>
                    <div class="quiz-option-text">${option.text}</div>
                `;

                optionDiv.addEventListener('click', () => {
                    document.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
                    optionDiv.classList.add('selected');
                    selectedValue = option.value;
                    btnNext.disabled = false;
                });

                optionsGrid.appendChild(optionDiv);
            });
        }

        function showResult() {
            let winningPlan = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
            if(scores.entrada === scores.regular || scores.regular === scores.premium) winningPlan = "regular";

            const result = plans[winningPlan];
            document.getElementById('result-title').textContent = result.title;
            document.getElementById('result-desc').textContent = result.desc;
            
            const featuresList = document.getElementById('result-features');
            featuresList.innerHTML = '';
            result.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });

            progressBar.style.width = '100%';
            questionArea.classList.remove('active');
            resultArea.classList.add('active');
        }

        btnNext.addEventListener('click', () => {
            if (selectedValue) {
                scores[selectedValue]++;
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    renderQuestion();
                } else {
                    showResult();
                }
            }
        });

        if(btnRestart) {
            btnRestart.addEventListener('click', () => {
                currentQuestionIndex = 0;
                scores = { entrada: 0, regular: 0, premium: 0 };
                resultArea.classList.remove('active');
                questionArea.classList.add('active');
                renderQuestion();
            });
        }

        renderQuestion();
    }
});

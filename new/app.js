// Массив возможных бустеров
const boosters = [
    "Бустер Modern Horizons 2",
    "Бустер Strixhaven",
    "Бустер Zendikar Rising",
    "Бустер Kaldheim",
    "Бустер Theros Beyond Death",
    "Бустер Throne of Eldraine",
    "Бустер War of the Spark",
    "Бустер Ravnica Allegiance"
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Навигация между страницами
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            
            // Скрываем все страницы
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Показываем выбранную страницу
            document.getElementById(pageId).classList.add('active');
        });
    });
    
    // Показ/скрытие деклистов
    document.querySelectorAll('.show-deck').forEach(button => {
        button.addEventListener('click', function() {
            const deckList = this.closest('.deck-actions').nextElementSibling;
            if (deckList.style.display === 'block') {
                deckList.style.display = 'none';
                this.textContent = 'Показать деклист';
            } else {
                deckList.style.display = 'block';
                this.textContent = 'Скрыть деклист';
            }
        });
    });
    
    // Функция для генерации случайных бустеров
    function generateBoosters(boosterContainer) {
        const boostersElements = boosterContainer.querySelectorAll('.booster');
        const randomBooster1 = boosters[Math.floor(Math.random() * boosters.length)];
        let randomBooster2;
        
        // Гарантируем что бустеры будут разные
        do {
            randomBooster2 = boosters[Math.floor(Math.random() * boosters.length)];
        } while (randomBooster2 === randomBooster1);
        
        boostersElements[0].textContent = randomBooster1;
        boostersElements[1].textContent = randomBooster2;
    }
    
    // Обработка кнопок заказа
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', function() {
            const deck = this.closest('.deck');
            const deckName = deck.querySelector('h3').textContent;
            const boostersContainer = deck.querySelector('.boosters');
            
            // Генерируем бустеры
            generateBoosters(boostersContainer);
            
            // Показываем бустеры
            if (boostersContainer.style.display === 'block') {
                boostersContainer.style.display = 'none';
            } else {
                boostersContainer.style.display = 'block';
            }
            
            // Показываем модальное окно
            showOrderModal(deckName);
        });
    });
    
    // Модальное окно
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-btn');
    const orderForm = document.getElementById('order-form');
    
    // Показать модальное окно
    function showOrderModal(deckName) {
        document.getElementById('deck').value = deckName;
        modal.style.display = 'flex';
    }
    
    // Закрыть модальное окно
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Закрыть при клике вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Обработка формы заказа
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const deck = document.getElementById('deck').value;
        const address = document.getElementById('address').value;
        
        alert(`Спасибо за заказ, ${name}! Ваша колода "${deck}" будет отправлена по адресу: ${address}. Подробности отправлены на ${email}`);
        
        // Очищаем форму и закрываем модальное окно
        orderForm.reset();
        modal.style.display = 'none';
    });
});
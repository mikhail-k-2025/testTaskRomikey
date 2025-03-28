'use strict'

//
/*===== Меню =====*/
//

document.addEventListener('DOMContentLoaded', function() {
    // Обрабатываем все бегущие строки
    document.querySelectorAll('.marquee').forEach(marquee => {
        const content = marquee.querySelector('.marquee__content');
        const speed = content.dataset.speed || 15;
        
        // Клонируем содержимое с сохранением HTML-структуры
        const originalHTML = content.innerHTML;
        content.innerHTML = `${originalHTML} ${originalHTML} ${originalHTML}`;
        
        // Рассчитываем ширину оригинального текста
        const temp = document.createElement('div');
        temp.style.display = 'inline-block';
        temp.style.visibility = 'hidden';
        temp.style.position = 'absolute';
        temp.innerHTML = originalHTML;
        document.body.appendChild(temp);
        const textWidth = temp.offsetWidth;
        document.body.removeChild(temp);
        
        // Создаем уникальное имя анимации
        const animationName = `marquee-${Math.random().toString(36).substr(2, 9)}`;
        
        // Динамически добавляем keyframes
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes ${animationName} {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${textWidth}px); }
            }
        `;
        document.head.appendChild(style);
        

        content.style.animationName = animationName;
        content.style.animationDuration = `${textWidth / (speed * 10)}s`;
    });
});
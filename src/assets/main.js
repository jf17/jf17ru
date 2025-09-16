// Функциональность копирования кода
document.addEventListener('DOMContentLoaded', function () {
    // Находим все блоки кода
    const codeBlocks = document.querySelectorAll('pre.code');

    codeBlocks.forEach(function (codeBlock) {
        // Создаем контейнер для кода с кнопкой
        const container = document.createElement('div');
        container.className = 'code-container';

        // Создаем кнопку копирования
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';

        // Обработчик клика по кнопке
        copyBtn.addEventListener('click', function () {
            const code = codeBlock.querySelector('code');
            const text = code.textContent || code.innerText;

            // Копируем в буфер обмена
            navigator.clipboard.writeText(text).then(function () {
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('copied');

                // Возвращаем исходный текст через 2 секунды
                setTimeout(function () {
                    copyBtn.textContent = 'Copy';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(function (err) {
                console.error('Ошибка копирования: ', err);
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);

                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('copied');
                setTimeout(function () {
                    copyBtn.textContent = 'Copy';
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        });

        // Заменяем оригинальный блок кода на контейнер с кнопкой
        codeBlock.parentNode.insertBefore(container, codeBlock);
        container.appendChild(codeBlock);
        container.appendChild(copyBtn);
    });
});
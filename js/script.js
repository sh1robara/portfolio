
const skills = {
    data: [
        {
            name: "HTML",
            level: 40,
            icon: "skill=html.svg"
        },
        {
            name: "CSS",
            level: 40,
            icon: "skill=css.svg"
        },
        {
            name: "Python",
            level: 40,
            icon: "skillpython.svg"
        },
        {
            name: "C++",
            level: 40,
            icon: "skill=c++.svg"
        }
    ],

    generateList(parentElement) {
        parentElement.replaceChildren();

        this.data.forEach((skill) => {

            // Создаём название навыка
            const skillItem = document.createElement("dt");

            // Добавляем CSS-класс
            skillItem.classList.add("skill-item");

            // Добавляем название навыка
            skillItem.textContent = skill.name;

            // Подключаем иконку через JavaScript
            skillItem.style.backgroundImage =
                `url("img/${skill.icon}")`;

            // Создаём элемент уровня навыка
            const skillLevel = document.createElement("dd");

            skillLevel.classList.add("skill-level");

            // Создаём полоску прогресса
            const skillProgress = document.createElement("div");

            // Устанавливаем ширину
            skillProgress.style.width = `${skill.level}%`;

            // Добавляем текст с процентами
            skillProgress.textContent = `${skill.level}%`;

            // Вкладываем полоску в уровень
            skillLevel.append(skillProgress);

            // Добавляем элементы в список
            parentElement.append(skillItem, skillLevel);
        });
    },

    sortByName(parentElement) {
        this.data.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        this.generateList(parentElement);
    },

    sortByLevel(parentElement) {
        this.data.sort((a, b) =>
            b.level - a.level
        );

        this.generateList(parentElement);
    }
};

// Получаем список со страницы
const skillList = document.querySelector("dl.skill-list");

// Генерируем список навыков
skills.generateList(skillList);

// Получаем кнопки сортировки
const sortNameButton = document.querySelector("#sort-name");
const sortLevelButton = document.querySelector("#sort-level");

// Сортировка по названию
sortNameButton.addEventListener("click", () => {
    skills.sortByName(skillList);
});

// Сортировка по уровню
sortLevelButton.addEventListener("click", () => {
    skills.sortByLevel(skillList);
});

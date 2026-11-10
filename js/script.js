
const skills = {

    // Данные о навыках
    data: [
        {
            name: "HTML",
            level: 70,
            icon: "skill=html.svg"
        },
        {
            name: "CSS",
            level: 40,
            icon: "skill=css.svg"
        },
        {
            name: "Python",
            level: 50,
            icon: "skillpython.svg"
        },
        {
            name: "C++",
            level: 10,
            icon: "skill=c++.svg"
        }
    ],

    // Текущий режим сортировки
    sortMode: null,

    // Генерация списка навыков
    generateList(parentElement) {

        // Очищаем список перед генерацией
        parentElement.innerHTML = "";

        this.data.forEach((skill) => {

            // Создаём название навыка
            const skillItem = document.createElement("dt");

            skillItem.classList.add("skill-item");

            skillItem.textContent = skill.name;

            // Добавляем иконку через JavaScript
            skillItem.style.backgroundImage =
                `url("img/${skill.icon}")`;

            // Создаём элемент уровня навыка
            const skillLevel = document.createElement("dd");

            skillLevel.classList.add("skill-level");

            // Создаём полоску прогресса
            const skillProgress = document.createElement("div");

            skillProgress.style.width = `${skill.level}%`;

            skillProgress.textContent = `${skill.level}%`;

            // Добавляем полоску внутрь dd
            skillLevel.append(skillProgress);

            // Добавляем элементы на страницу
            parentElement.append(skillItem, skillLevel);

        });
    },

    // Универсальный метод сортировки
    sortList(type, parentElement) {

        // Если выбран новый тип сортировки
        if (this.sortMode !== type) {

            this.data.sort(getComparer(type));

            this.sortMode = type;

            console.log(
                `отсортировали данные по ${type}`
            );

        } else {

            // Повторное нажатие на ту же кнопку
            this.data.reverse();

            console.log(
                "инвертировали порядок сортировки"
            );

        }

        // Перерисовываем список
        this.generateList(parentElement);
    }
};


// Функция сравнения объектов
function getComparer(prop) {

    return function(a, b) {

        if (a[prop] < b[prop]) {
            return -1;
        }

        if (a[prop] > b[prop]) {
            return 1;
        }

        return 0;
    };
}


// Получаем список навыков
const skillList = document.querySelector("dl.skill-list");

// Первоначальная генерация списка
skills.generateList(skillList);


// Получаем блок с кнопками
const sortBtnsBlock = document.querySelector(".skills-sort");


// Делегирование событий
sortBtnsBlock.addEventListener("click", (e) => {

    const target = e.target;

    // Проверяем, что нажата кнопка
    if (target.nodeName === "BUTTON") {

        // Определяем тип сортировки
        switch (target.dataset.type) {

            case "name":

                skills.sortList("name", skillList);

                break;

            case "level":

                skills.sortList("level", skillList);

                break;

            default:

                console.log("неизвестная кнопка");

        }

        // Выделяем активную кнопку
        const buttons = sortBtnsBlock.querySelectorAll("button");

        buttons.forEach((button) => {
            button.classList.remove("active");
        });

        target.classList.add("active");
    }

});

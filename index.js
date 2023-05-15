"use strict"
// function response(numOnPage = 1, page = 0) {
//     fetch('https://kitsu.io/api/edge/anime?page[limit]=' + numOnPage + '&page[offset]=' + page)
//         .then(response => response.json()) // Декодируем ответ в формате json
//         .then(data => show(data)); // Выводим ответ

//     let lastbutton = document.querySelector('.lastButton'); // Находим кнопку предыдущей страницы
//     let nextbutton = document.querySelector('.nextButton'); // Находим кнопку следующей страницы

//     function handler1() {
//         response(1, page -= 1); // Отнимаем страницы
//         lastbutton.removeEventListener('click', handler1);// Перестаем слушать кнопки, если не будем это делать, отправится несколько запросов
//         nextbutton.removeEventListener('click', handler2);
//     }

//     function handler2() {
//         response(1, page += 1); // Прибавляем страницы
//         lastbutton.removeEventListener('click', handler1); // Перестаем слушать кнопки, если не будем это делать, отправится несколько запросов
//         nextbutton.removeEventListener('click', handler2);
//     }

//     lastbutton.addEventListener('click', handler1); // Слушаем кнопку пред страницы
//     nextbutton.addEventListener('click', handler2); // Слушаем кнопку след страницы
// }  Старая версия оставлена на память

function response() {
    let currentPage = 0;

    function fetchPage(numOnPage = 1, page = 0) {
        fetch('https://kitsu.io/api/edge/anime?page[limit]=' + numOnPage + '&page[offset]=' + page)
            .then(response => response.json()) // Декодируем ответ в формате json
            .then(data => show(data)); // ВЫВОД - Выводим ответ в функцию show
    }

    document.querySelector('.lastButton').addEventListener('click', () => {
        fetchPage(1, currentPage -= 1); // Перелистываем на пред страницу
    });
    document.querySelector('.nextButton').addEventListener('click', () => {
        fetchPage(1, currentPage += 1); // Перелистываем на след страницу
    });
    document.querySelector('.rndButton').addEventListener('click', () => {
        fetchPage(1, currentPage = Math.floor(Math.random() * 18742)); // Открываем рандомную страницу
    });

    fetchPage(1, currentPage); // Загружаем стартовую страницу
}
response();

function show(data) {
    console.log(data)
    let takeFrom = data.data[0];
    let name = takeFrom.attributes.canonicalTitle;
    let description = takeFrom.attributes.description;
    let coverImage = takeFrom.attributes.coverImage.original; // Не все разрешения есть. Сделай обход ошибки
    let posterImage = takeFrom.attributes.posterImage.original;

    let doc = document.querySelector('.general')
    doc.innerHTML = '<div class="animePage">' +
        '<img src="' + coverImage + '"></img>' +
        '<img src="' + posterImage + '"></img>' +
        '<h4>' + name + '</h4>' +
        '<p>' + description + '</p>' +
        '</div>' +
        '<div class="animeDetails">' +
        '<h3>Details</h3>' +
        '<ul>' +
        '<li>Age rating ' + takeFrom.attributes.ageRating + ' ' + data.data[0].attributes.ageRatingGuide + '</li>' +
        '<li>episodeCount ' + takeFrom.attributes.episodeCount + '</li>' +
        '<li>startDate ' + takeFrom.attributes.startDate + '</li>' +
        '<li>status ' + takeFrom.attributes.status + '</li>' +
        '<li>averageRating ' + data.data[0].attributes.averageRating + '</li>' +
        '<li>Age rating ' + data.data[0].attributes.ageRating + '</li>' +
        '<li>Age rating ' + data.data[0].attributes.ageRating + '</li>' +
        '<li>Age rating ' + data.data[0].attributes.ageRating + '</li>' +
        '</ul>' +
        '</div>'
}

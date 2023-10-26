## Технологии и инструменты, используемые на проекте
<img src="https://img.shields.io/badge/TypeScript-282C34?logo=typescript&logoColor=3178C6" alt="TypeScript logo" title="TypeScript" height="25" />&nbsp;
<img src="https://img.shields.io/badge/React-282C34?logo=react&logoColor=7BFEDE" alt="React logo" title="React" height="25" />&nbsp;
<img src="https://img.shields.io/badge/Redux-282C34?logo=redux&logoColor=764ABC" alt="Redux logo" title="Redux" height="25" />&nbsp;
<img src="https://img.shields.io/badge/Axios-282C34?logo=axios&logoColor=5A29E4" alt="Axios logo" title="Axios" height="25" />&nbsp;
<img src="https://img.shields.io/badge/Vite-282C34?logo=vite&logoColor=646CFF" alt="Vite logo" title="Vite" height="25" />&nbsp;
<img src="https://img.shields.io/badge/Swiper-282C34?logo=swiper&logoColor=6332F6" alt="Swiper logo" title="Swiper" height="25" />&nbsp;
<img src="https://img.shields.io/badge/React%20Hook%20Form-282C34?logo=react-hook-form&logoColor=EC5990" alt="React Hook Form logo" title="React Hook Form" height="25" />&nbsp;
<img src="https://img.shields.io/badge/Vitest-282C34?logo=vitest&logoColor=6E9F18" alt="Vitest logo" title="Vitest" height="25" />&nbsp;

### Интернет-магазин Фотошоп - онлайн сервис для покупки видео- и фотоаппаратов разного уровня, ценовой категории, типа.

### На главной странице реализованы:
- рекламный баннер (Swiper);
- пагинация;
- поисковая строка (запускается после ввода 3-х символов);
- сортировка и фильтр товаров. Результат сортировки имеет свой уникальный URL;
- модальные окна при добавлении товара в корзину;

### На странице товара:
- слайдер похожих товаров (Swiper);
- табы;
- подгрузка отзывов по клику;
- отправка нового отзыва о товаре (валидация React Hook Form);
- модальные окна (отправление комментария, добавление товара в корзину).

### Страница корзины:
- возможность изменять состав и количество товаров (как при клике на кнопки, так и при ручном вводе);
- реализвана проверка ввода промокода для получения скидки (попробовать: `camera-333`);
- модальные окна (для подверждения удаления товара из корзины и успешной отправке заказа).

#### Написаны unit тесты ко всем компонентам (Vitest, React Testing Library)

## Время работы

Количество часов, затраченных на проект: 75 часов

## Ссылка на хост: 

[online camera store](https://camera-build-vite-temirgalieva.vercel.app/)


## Алгоритм работы над проектом

1. Установите зависимости, выполнив команду `npm install`.

2. Проверьте работу приложения, выполнив команду `npm start`.

3. Перейдите по адресу, указанному в терминале (скорее всего, это будет `http://localhost:5173/`).

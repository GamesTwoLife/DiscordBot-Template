<h1 align="center">Ласкаво просимо до шаблону дискорд бота</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/версія-v0.0.5-blue.svg" />
  <a href="https://github.com/GamesTwoLife/DiscordBot-Template#readme" target="_blank">
    <img alt="Документація" src="https://img.shields.io/badge/Документація-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/GamesTwoLife/DiscordBot-Template/graphs/commit-activity" target="_blank">
    <img alt="Підтримується" src="https://img.shields.io/badge/Підтримується%3F-yes-green.svg" />
  </a>
</p>

> Шаблон бота з **відкритим вихідним кодом** `discord.js`, який базується на офіційному [посібнику з discord.js](https://discordjs.guide/), щоб розпочати створення свого особистого бота для Discord!

### [Домашня сторінка](https://github.com/GamesTwoLife/DiscordBot-Template#readme)

## Введення

Discord Bot Template — це шаблон бота з відкритим вихідним кодом на основі discord.js для початку роботи над новим проектом бота. Це класичний шаблон javascript, який не вимагає жодних зовнішніх залежностей, на відміну від інших відомих фреймворків. (Це не фреймворк!)
За допомогою цього шаблону можна масштабувати будь-який проект бота. (на основі одного або кількох серверів) Все залежить від вашої творчості!

### Особливості:

Цей шаблон містить багато вбудованих корисних і гнучких функцій, наприклад:

#### • **Динамічний обробник подій:**

- Усі події зберігаються в папці [events](https://github.com/GamesTwoLife/DiscordBot-Template/blob/master/events/). Вам не потрібно використовувати `client.on()` в основному файлі `index.js` для обробки подій.
- Використовуючи простий каркасний код для подій, ви можете створити будь-яку кількість подій у папці подій за допомогою обробника подій.

#### • **Динамічний обробник команд (як слеш так і контекстного меню):**

- Мій шаблон постачається з динамічним обробником команд, який дуже легко налаштовувати та створювати команди.
- Команди в папці commands отримують об’єкт [`ChatInputCommandInteraction`](https://discord.js.org/docs/packages/discord.js/14.14.1/ChatInputCommandInteraction) або [`ContextMenuCommandInteraction`](https://discord.js.org/docs/packages/discord.js/14.14.1/ContextMenuCommandInteraction) в залежності від типу команди (слеш або контекстна).
- **ВАЖЛИВО:** У шаблоні ми надсилаємо команди в Discord для реєстрації лише в 1 гільдії. Це тому, що є 2 типи команд, гільдійські та глобальні. Команди гільдії обмежені 1 гільдією, але щоразу, коли ви їх оновлюєте, вони набувають чинності негайно, тоді як для глобальних команд потрібно до 1 години. Тому використовуйте команди гільди у розробці та глобальні команди для виробництва. (змінити це можна використавши параметр `devGuildOnly`: `true` - команда в 1 гільдії, `false` - глобальна команда)

#### • **Динамічний обробник взаємодії кнопок:**

- Цей шаблон поставляється з динамічним обробником взаємодії кнопок для отримання та обробки взаємодії кнопок.
- Кнопки можна класифікувати в різних папках.

#### • **Динамічний обробник взаємодії меню вибору:**

- Цей шаблон поставляється з динамічним обробником взаємодії меню вибору для отримання та обробки взаємодії меню вибору.
- Меню можна класифікувати в різних папках.

#### • **Динамічний обробник взаємодії модальних вікон:**

- Легко обробляйте вхідні модальні подання за допомогою обробника шаблонів!
- Модальні вікна можна класифікувати в різних папках.

#### • **Динамічний обробник взаємодії автозаповнень:**

- Легко обробляйте вхідні запити автозаповнення за допомогою обробника шаблонів!
- Ідеально динамічний для всіх ваших потреб!

#### • **Широкі можливості налаштування:**

Користуватися шаблоном так легко та весело, ви б знали. Оскільки шаблон не залежить від будь-яких зовнішніх залежностей і написаний на javascript, його можна налаштувати будь-яким чином. Вашій творчості немає кінця!

#### • **З відкритим вихідним кодом і самостійно розміщено:**

> Це ваше, ви маєте повний контроль.

## Встановіть

```sh
npm install
```

## Налаштуйте

- Перейменуйте [`config-example.json`](https://github.com/GamesTwoLife/DiscordBot-Template/blob/master/config-example.json) на `config.json` та заповніть маркер бота, його ID та інші значення. Розширте `config.json` відповідно до ваших потреб!

## Запустіть свого бота

```sh
npm start
```

## Підтримка та документація

Шаблон активно підтримується, якщо виникають якісь проблеми або запитання по роботі шаблону, зверніться до [мене в Discord](https://discord.gg/users/713064369705189446)

## Автор

**GamesTwoLife**

- Github: [@GamesTwoLife](https://github.com/GamesTwoLife)

### Дописувачі

Сюди може потрапити кожен, за внесок у розвиток проекту

## Сприяння

Вітаються внески, проблеми та запити щодо функцій!<br />Не соромтеся перевірити [сторінку проблем](https://github.com/GamesTwoLife/DiscordBot-Template/issues). Ви також можете ознайомитися з [посібником зі створення внеску](https://github.com/GamesTwoLife/DiscordBot-Template/blob/master/CONTRIBUTING.md).

## Продемонструйте вашу підтримку

Поставте ⭐️, якщо цей проект допоміг вам! Оцінка проекту надихає мене продовжувати його.

## Ліцензія

Copyright © 2023 [GamesTwoLife](https://github.com/GamesTwoLife).<br />
Цей проект має ліцензію [Apache-2.0](LICENSE).

---

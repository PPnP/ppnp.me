# ppnp.me ![](https://github.com/PPnP/ppnp.me/workflows/Deploy%20to%20production/badge.svg)

> Official PPnP team website
>
> [![](https://img.shields.io/badge/backend-Stepan%20Denisov-lightblue)](https://t.me/sd_denisoff 'Telegram')
> [![](https://img.shields.io/badge/frontend-Matvey%20Kottsov-orange)](https://vk.com/kottsovcom 'VK profile')
> [![](https://img.shields.io/badge/DS%26ML-Denis%20Kozlov-blue)](https://vk.com/dkozl 'VK profile')
> [![](https://img.shields.io/badge/UX%2FUI-Leonid%20Kravtsov-green)](https://vk.com/leokravtsov 'VK profile')
> [![](https://img.shields.io/badge/PM%26BA-Pavel%20Krylov-lightgrey)](https://vk.com/pkryloff 'VK profile')

## Инструкция по загрузке сайта на хостинг

Для этого необходимо [создать новый релиз](https://github.com/PPnP/ppnp.me/releases) здесь, на GitHub. Назвать его стоит в формате v?.?.?. Версия должна быть выше, чем предыдущая. После создания релиза будет запущен конвеер, который соберет сайт и отправит его на хостинг.

Не рекомендуется создавать новый релиз, если с момента создания предыдущего прошло меньше 10 минут.

## Инструкция по локальному запуску

1. Склонируйте репозиторий и перейдите в соответствующую директорию
    ```
    git clone <link>
    cd <project_directory>
    ```
    
2. Установите hugo для запуска веб-сервера
    ```
    brew install hugo
    ```

4. Запустите веб-сервер
    ```
    hugo server --disableFastRender --ignoreCache
    ```
   
## Управление контентом

### Настройка сайта

Все необходимые переменные задаются в файле [config.toml](config.toml) корневой директории.

### Работа с меню

Редактирование меню, как и настройка сайта, происходит в файле [config.toml](config.toml) корневой директории.

### Добавление контента

Все названия пишутся на английском языке, в kebab-case и без специальных символов. Чтобы добавить новый контент на сайт, выполняйте следующие команды:

1. Новое событие
    ```
    hugo new events/<year>/<event-name>/index.md
    ```
2. Новый участник
    ```
    hugo new members/<member-surname>/index.md
    ```
3. Новая услуга
    ```
    hugo new services/<service-name>/index.md
    ```

Созданный файл **index.md** будет содержать описание формата, в котором необходимо представлять информацию. Все типы контента будут отображаться только в том случае, если для них корректно указана картинка или изображение.

Текст пишется на языке разметки Markdown. 

### Удаление контента

Для удаления достаточно удалить соответствующую папку или файл.


Developed by [PPnP team](https://ppnp.me 'team website')

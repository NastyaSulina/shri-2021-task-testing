module.exports = {
    baseUrl: 'https://shri-homework.usr.yandex-academy.ru',
    gridUrl: 'http://127.0.0.1:4444/wd/hub',
    sets: {
        common: {
          files: "test/**"
        },
    },
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
};
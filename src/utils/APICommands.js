const APICommands = function () {


    const status = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }
    const userDbApiURL = "http://127.0.0.1:8000/api/users";
    const exportToExcelURL = 'http://localhost:8000/api/users/exportToExcel'
    const getUsersByDateURL = (from, till) => {
        return `http://127.0.0.1:8000/api/users/?from=${from}&till=${till}`
    }
    const getUsersByCityURL = (city) => {
        return `http://127.0.0.1:8000/api/users/?city=${city}`
    }
    return {status, userDbApiURL, getUsersByDateURL, getUsersByCityURL, exportToExcelURL};
}();

module.exports = APICommands;

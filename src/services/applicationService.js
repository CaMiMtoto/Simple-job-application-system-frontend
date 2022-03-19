import http from "./httpService";

const config = require("../config.json");

const apiEndpoint = config.apiUrl + "/application";


export function getApplications() {
    return http.get(apiEndpoint + '/all');
}

export function getApplication(id) {
    return http.get(apiEndpoint + '/' + id);
}

export function submitApplication(application) {
    return http.post(apiEndpoint + '/submit', application);
}

export function changeApplicationStatus(id, status) {
    return http.post(`${apiEndpoint}/${id}?status=${status}`);
}

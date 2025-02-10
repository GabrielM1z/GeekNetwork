//import { initSql, initNoSql, followers, followersProducts } from "./api.js";
import { followers, followersProducts } from "./api.js";
import { toggleFollowersFields, toggleFollowersProductsFields, handleAction } from "./ui.js";
import { toggleQuantityField } from "../components/forms.js";
import { closeParamsModal } from "../components/history.js";
import "./charts.js";
let requestCount = 0;

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("action").addEventListener("change", toggleQuantityField);
    document.getElementById("initButton").addEventListener("click", handleAction);
    document.getElementById("followersButton").addEventListener("click", toggleFollowersFields);
    document.getElementById("followersProductsButton").addEventListener("click", toggleFollowersProductsFields);
    document.getElementById("followers-search").addEventListener("click", followers);
    document.getElementById("followersProducts-search").addEventListener("click", followersProducts);
    document.getElementById("close_param").addEventListener("click", closeParamsModal);

});
"use strict";

import { GITHUB_USER_SEARCH_API } from "../api/API";

const user_image = document.querySelector(".user_image_wrap img");
const user_defult_image_path = "./public/images.png";
const inputElement = document.querySelector("#searchInput");
user_image.src = user_defult_image_path;
const user_details_profile_name = document.querySelector(".user_details_profile h1");
const user_details_profile_bio = document.querySelector(".user_details_profile p");
const user_details_info_company_name = document.querySelector(".user_details_info_company_name");
const user_details_info_location = document.querySelector(".user_details_info_location");
const user_details_github_info_follower = document.querySelector(".user_details_github_info_follower");
const user_details_github_info_following = document.querySelector(".user_details_github_info_following");
const user_details_github_info_responsinator = document.querySelector(".user_details_github_info_responsinator");
let user = [];

inputElement.addEventListener("input", async (e) => {
    const inputValue = e.target.value;
    getUserByGithub(inputValue);
});

const getUserByGithub = async (user_name) => {
    try {
        const response = await fetch(`${GITHUB_USER_SEARCH_API}/${user_name}`);
        const data = await response.json();
        console.log(data);
        if(response.ok) {
            user_image.src= data.avatar_url;
            user_details_profile_name.textContent = data.name;
            user_details_profile_bio.textContent = data.bio;
            user_details_info_company_name.textContent = data.company;
            user_details_info_location.textContent = data.location;
        }
    } catch (error) {

    }
}



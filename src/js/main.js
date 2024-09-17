"use strict";

import { GITHUB_USER_SEARCH_API } from "../api/API";

const user_image = document.querySelector(".user_image_wrap img");
const user_default_image_path = "./public/images.png";
const inputElement = document.querySelector("#searchInput");
const user_details_profile_name = document.querySelector(".user_details_profile h1");
const user_details_profile_bio = document.querySelector(".user_details_profile p");
const user_details_info_company_name = document.querySelector(".user_details_info_company_name");
const user_details_info_location = document.querySelector(".user_details_info_location");
const user_details_github_info_follower = document.querySelector(".user_details_github_info_follower");
const user_details_github_info_following = document.querySelector(".user_details_github_info_following");
const user_details_github_info_responsinator = document.querySelector(".user_details_github_info_responsinator");

user_image.src = user_default_image_path;
user_details_profile_name.textContent = "Please search a GitHub user";
user_details_profile_bio.textContent = "";
user_details_info_company_name.textContent = "";
user_details_info_location.textContent = "";
user_details_github_info_follower.textContent = "";
user_details_github_info_following.textContent = "";
user_details_github_info_responsinator.textContent = "";

inputElement.addEventListener("input", async (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue.length > 0) {
        await getUserByGithub(inputValue);
    } else {
        resetUserDetails();
    }
});

const getUserByGithub = async (user_name) => {
    try {
        const response = await fetch(`${GITHUB_USER_SEARCH_API}/${user_name}`);
        const data = await response.json();
        if (response.ok && data) {
            user_image.src = data.avatar_url || user_default_image_path;
            user_details_profile_name.textContent = data.name || "No name available";
            user_details_profile_bio.textContent = data.bio || "No bio available";
            user_details_info_company_name.textContent = data.company || "No company available";
            user_details_info_location.textContent = data.location || "No location available";
            user_details_github_info_follower.textContent = `Followers: ${data.followers}`;
            user_details_github_info_following.textContent = `Following: ${data.following}`;
            user_details_github_info_responsinator.textContent = `Repositories: ${data.public_repos}`;
        } else {
            showNoUserFound();
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        showNoUserFound();
    }
}

const showNoUserFound = () => {
    user_image.src = user_default_image_path;
    user_details_profile_name.textContent = "No user found";
    user_details_profile_bio.textContent = "";
    user_details_info_company_name.textContent = "";
    user_details_info_location.textContent = "";
    user_details_github_info_follower.textContent = "";
    user_details_github_info_following.textContent = "";
    user_details_github_info_responsinator.textContent = "";
}

const resetUserDetails = () => {
    user_image.src = user_default_image_path;
    user_details_profile_name.textContent = "Please search a GitHub user";
    user_details_profile_bio.textContent = "";
    user_details_info_company_name.textContent = "";
    user_details_info_location.textContent = "";
    user_details_github_info_follower.textContent = "";
    user_details_github_info_following.textContent = "";
    user_details_github_info_responsinator.textContent = "";
}

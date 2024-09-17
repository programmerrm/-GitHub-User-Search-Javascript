"use strict";

import { GITHUB_USER_SEARCH_API } from "./src/api/API";

const nameElement = document.querySelector("#name");
const bioElement = document.querySelector("#bio");
const imageTag = document.querySelector("#imageTag");

const inputTag = document.querySelector("#searchInput");

inputTag.addEventListener("input", async (e) => {
    const userName = e.target.value;
    if (userName) {
        await getUser(userName);
    } else {
        // Clear previous data if input is empty
        nameElement.textContent = "Name not available";
        bioElement.textContent = "Bio not available";
        imageTag.src = `./public/images.png`; // Clear the image
    }
});

const getUser = async (name) => {
    try {
        const response = await fetch(`${GITHUB_USER_SEARCH_API}/${name}`);
        if (!response.ok) {
            throw new Error("User not found");
        }
        const data = await response.json();
        
        // Update DOM elements with user data
        nameElement.textContent = data.name || "Name not available";
        bioElement.textContent = data.bio || "Bio not available";
        imageTag.src = data.avatar_url || ""; // Use avatar_url for image src
    } catch (error) {
        console.error("Error fetching user:", error);
        nameElement.textContent = "Error fetching user";
        bioElement.textContent = "";
        imageTag.src = ""; // Clear the image on error
    }
};

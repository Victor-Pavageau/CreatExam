<template>
    <div class="home">
    <router-link to="/client" class="profile__avatar">
      <button class="button">
       <img src="../assets/logo-new.png" alt="Avatar" width="90" height="90"  /> 
      </button>
      Client
      </router-link>
  
      <router-link to="/delivery" class="profile__avatar">
      <button class="button">
       <img class ="delivery-blue" src="../assets/logo-delivery-blue.png" alt="Avatar" width="70" height="70"  /> 
      </button>
      Delivery
      </router-link>
      <router-link to="/restaurant" class="profile__avatar">
      <button class="button">
       <img class ="delivery-orange" src="../assets/logo-delivery-orange.png" alt="Avatar" width="95" height="95"  /> 
      </button>
      Restaurant
      </router-link>
    </div>
  </template>
  
  <style>
  #app {
    align-items: center;
  }
  .home {
    display: flex;
    justify-content: center;
    margin-top: 40%;
  }
  .profile__avatar {
    cursor: pointer;
    border: 0;
    padding: 0;
    background-color: transparent;
    position: relative;
    margin: 10px;
    text-align: center;
    color: #003049;
    text-decoration: none;
  
  }
img {
    transform: translate(-15px, -13px);
  
  }
.delivery-blue {
    transform: translate(0px, 5px);
  
  }
.delivery-orange {
    transform: translate(-15px, -10px);
  
  }

  .button {
    cursor: pointer;
    position: relative;
    z-index: 1;
    border-radius: 1.25em;
    overflow: hidden;
    width: 6em;
    height: 6em;
    display: block;
    border: white 2px solid;
  }
  .button img {
    transition: filter 0.3s ease;
  }
  .button:hover img {
    filter: brightness(80%);
  }
  
  </style>
  
<template>
  <div class="card">
    <div class="card-title">Login</div>
    <div class="card-subtitle"> Please sign in to your existing account</div>
    <div class="card-body">
      <form >
      <div class="input-label"><label>E-mail</label></div>
      <input
        class="input-field-auth"
        type="text"
        id="user_mail"
        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$"
        title="Enter a valid email"
        
      />
      <div class="input-label"><label>Password</label></div>
      <input
        class="input-field-auth"
        type="password"
        id="user_password"
        
      />
      <button class="green-button" type="submit">connect</button>
    </form>
    </div>
  </div>
</template>

<style>
.card {
  width: 350px;
  margin: 0 auto;
  margin-top: 20%;
  background: #121223;
  border-radius: 24px;
}
.card-title {
  color: #fff;
  font-family: 'Sen', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  padding-top: 20%;
}
.card-subtitle {
  color: #fff;
  font-family: 'Sen', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  padding-bottom: 15%;
}
.card-body {
  padding: 20px;
  background-color: #fff;
  border-radius: 24px;
}
.input-label {
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */
  text-align: Left;
  text-transform: uppercase;
  color: #32343E;
  padding: 4px 4px 4px 4px;
  
}
input {
  display: flex;
  background: #F0F5FA;
  border-radius: 10px;
  height: 4em;
  font-family: 'Sen';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border: 0;
  align-items: center;
  width: 100%;
/* identical to box height */
  color: #A0A5BA;
  margin-bottom: 8px;
}
</style>
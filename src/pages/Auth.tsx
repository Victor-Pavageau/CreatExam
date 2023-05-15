import React, { useState } from "react";
import axios from "axios";

interface UserData {
  email: string;
  password: string;
}

const SignUpLoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: UserData = {
      email,
      password,
    };
    axios
      .post("/api/auth/register_login", userData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(email);
          }}
          required
        />
        <small>We'll never share your email with anyone else.</small>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="allow-emails">
          <input type="checkbox" id="allow-emails" />
          I hereby confirm that the referral app is allowed to send me emails, up until I unsuscribe
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUpLoginForm;

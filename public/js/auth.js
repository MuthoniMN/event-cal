const registerForm = document.querySelector("#registerForm");
const loginForm = document.getElementById("loginForm");

if(registerForm){ 
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(registerForm));

    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const resData = await response.json();

    if(resData.status == 201) {
      window.location.href = "/login";
    }
  });
}

if (loginForm){
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(loginForm));

    const response = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const resData = await response.json();

    if(response.ok) {
      localStorage.setItem("access_token", resData.data.token);
      window.location.href = "/profile";
    }
  });
}

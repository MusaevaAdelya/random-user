const URL = "https://randomuser.me/api/";

const ROOT = document.getElementById("root");
const NEXT = document.getElementById("next-btn");

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function formatDateString(inputDateString) {
  // Create a new Date object using the input date string
  const date = new Date(inputDateString);

  // Extract day, month, and year
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
  const year = date.getFullYear();

  // Format the date as "DD/MM/YYYY"
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

function displayUserData(data) {
  const result = data.results[0];
  const userCard = `<div class="card">
  <img
    class="card__pic"
    src="${result.picture.large}"
    alt="user's avatar"
  />
  <h1 class="card__name">
    <i class="bi bi-gender-${result.gender} icon-gender"></i> ${
    result.name.first
  } ${result.name.last}
  </h1>
  <p class="card__location">
    <i class="bi bi-geo-alt-fill"></i> ${result.location.country}, ${
    result.location.city
  }
  </p>
  <div class="card__info">
    <p><span>Email:</span>${result.email}</p>
    <p><span>Username:</span>${result.login.username}</p>
    <p><span>Date of Birth:</span>${formatDateString(result.dob.date)}</p>
    <p><span>Age:</span>${result.dob.age}</p>
    <p><span>Phone:</span>${result.phone}</p>
  </div>
  <button id="next-btn" class="btn-primary" onclick="fetchUserData()">Next</button>
</div>`;

  ROOT.innerHTML = userCard;
}

function fetchUserData() {
  fetchData(URL).then((data) => {
    if (data) {
      displayUserData(data);
    } else {
      console.log("No data received.");
    }
  });
}

fetchUserData();

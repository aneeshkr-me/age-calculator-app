document.addEventListener("DOMContentLoaded", function () {
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const form = document.querySelector("form");
  const dayNum = document.getElementById("day-num");
  const monthNum = document.getElementById("month-num");
  const yearNum = document.getElementById("year-num");
  const errorText = document.querySelectorAll(".form-text");
  const labels = document.querySelectorAll("label");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    resetErrorState();

    if (
      !isValidDay(day.value) ||
      !isValidMonth(month.value) ||
      !isValidYear(year.value)
    ) {
      setErrorState("Invalid date format");
      return;
    }

    const today = new Date();
    const birthDate = new Date(year.value, month.value - 1, day.value);

    if (birthDate > today) {
      setErrorState("Date cannot be in the future");
      return;
    }

    const ageMilliseconds = today - birthDate;
    const ageDate = new Date(ageMilliseconds);

    const years = Math.floor(ageDate / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor(
      (ageDate % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000)
    );
    const days = Math.floor(
      (ageDate % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
    );

    dayNum.innerText = days;
    monthNum.innerText = months;
    yearNum.innerText = years;
  });

  function isValidDay(day) {
    return /^\d{1,2}$/.test(day) && parseInt(day) >= 1 && parseInt(day) <= 31;
  }

  function isValidMonth(month) {
    return (
      /^\d{1,2}$/.test(month) && parseInt(month) >= 1 && parseInt(month) <= 12
    );
  }

  function isValidYear(year) {
    return /^\d{4}$/.test(year);
  }

  function setErrorState(message) {
    errorText.forEach((text) => {
      text.innerText = message;
      text.style.display = "block";
      text.classList.add("error");
    });
    labels.forEach((text) => {
      text.classList.add("error");
    });
  }

  function resetErrorState() {
    errorText.forEach((text) => {
      text.innerText = "This field is required";
      text.style.display = "none";
    });
    labels.forEach((text) => {
      text.classList.remove("error");
    });
  }
});

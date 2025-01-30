document.addEventListener("DOMContentLoaded", async () => {
  const timePeriodSection = document.querySelector(".time-period-selector");
  const currentTimes = document.querySelectorAll(".current-time-value");
  const previousTimes = document.querySelectorAll(".previous-time-value");
  const timePeriodTexts = document.querySelectorAll(".time-period");

  async function fetchData() {
    try {
      const response = await fetch("../data/data.json");
      if(!response.ok) throw new Error("Failed to fetch data");
      return await response.json();

    } catch (error) {
      console.error("Error fetching data :", error);
      return null;
    }
  }

  timePeriodSection.addEventListener("click", async (e) => {
    const clickedElement = e.target;

    const timePeriod = e.target.dataset.id;
    if (!timePeriod) return;

    const data = await fetchData();
    if (!data) return;

    timePeriodSection
      .querySelectorAll(".time-period-option")
      .forEach((option) => option.classList.remove("active"));

    // Add active class to the clicked option
    clickedElement.classList.add("active");


    currentTimes.forEach((currentTime, index) => {
      currentTime.textContent = data[index].timeframes[timePeriod].current;
    });
    previousTimes.forEach((previousTime, index) => {
      previousTime.textContent = data[index].timeframes[timePeriod].previous;
    });
    timePeriodTexts.forEach((time) => {
      time.textContent = timePeriod;
    });
  });
});

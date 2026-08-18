/* ===========================================================
   Task 4 — Student Grade Calculator
   Demonstrates: variables & data types, literals, operators,
   selection (if/else) and iteration (for loop) statements,
   and a user-defined function.
   =========================================================== */

// Number of subjects the form collects — a numeric literal used
// wherever the subject count is needed, kept as one named constant.
const SUBJECT_COUNT = 5;

/**
 * getGrade(average)
 * A user-defined function: takes the numeric average (a Number)
 * and returns the letter grade (a String) using selection
 * statements (if / else if).
 */
function getGrade(average) {
  if (average >= 90) {
    return "A+";
  } else if (average >= 80) {
    return "A";
  } else if (average >= 70) {
    return "B";
  } else if (average >= 60) {
    return "C";
  } else if (average >= 40) {
    return "D";
  } else {
    return "F";
  }
}

/**
 * calculateResult(marks)
 * A user-defined function: accepts an array of five marks and
 * returns an object holding total, average, grade and pass/fail
 * status. This is where the arithmetic operators and the loop
 * (iteration statement) are demonstrated.
 */
function calculateResult(marks) {
  let total = 0; // variable, initialised with a numeric literal

  // Iteration statement: a for loop summing every subject's marks
  for (let i = 0; i < marks.length; i++) {
    total = total + marks[i]; // arithmetic operator: addition
  }

  const average = total / SUBJECT_COUNT; // arithmetic operator: division
  const grade = getGrade(average);

  // A subject below 35 is treated as a fail in that subject —
  // the logical operator (some()) checks this across the array.
  const hasFailingSubject = marks.some(function (mark) {
    return mark < 35; // relational operator: less-than
  });

  // Selection statement + logical AND: overall status depends on
  // both the average and whether any single subject failed.
  const status = (average >= 40 && !hasFailingSubject) ? "Pass" : "Fail";

  return { total, average, grade, status };
}

// ---------- Wiring the function up to the form ----------

const form = document.getElementById("gradeForm");
const resultPanel = document.getElementById("result");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const marks = [];
  let allValid = true;

  // Iteration statement: read and validate all five subject inputs
  for (let i = 1; i <= SUBJECT_COUNT; i++) {
    const input = document.getElementById("s" + i);
    const value = Number(input.value); // data type conversion: string -> number

    // Selection statement: reject anything outside 0–100
    if (isNaN(value) || value < 0 || value > 100) {
      allValid = false;
    }
    marks.push(value);
  }

  if (!allValid) {
    errorMsg.classList.remove("hidden");
    resultPanel.classList.add("hidden");
    return;
  }

  errorMsg.classList.add("hidden");

  const result = calculateResult(marks);

  document.getElementById("rTotal").textContent = result.total;
  document.getElementById("rAverage").textContent = result.average.toFixed(2) + "%";
  document.getElementById("rGrade").textContent = result.grade;

  const statusEl = document.getElementById("rStatus");
  statusEl.textContent = result.status;
  statusEl.className = "status " + (result.status === "Pass" ? "pass" : "fail");

  resultPanel.classList.remove("hidden");
});

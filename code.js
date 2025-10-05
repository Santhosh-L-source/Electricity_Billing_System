const $ = (id) => document.getElementById(id);

$("billForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("err").textContent = "";

  const name = $("name").value.trim();
  const prev = Number($("prev").value);
  const curr = Number($("curr").value);
  const fixed = Number($("fixed").value);

  if ([prev, curr, fixed].some(n => !isFinite(n))) {
    $("err").textContent = "Please enter valid numbers.";
    $("out").style.display = "none";
    return;
  }
  if (prev < 0 || curr < 0 || fixed < 0) {
    $("err").textContent = "Values cannot be negative.";
    $("out").style.display = "none";
    return;
  }
  if (curr < prev) {
    $("err").textContent = "Current reading cannot be less than previous reading.";
    $("out").style.display = "none";
    return;
  }

  const units = curr - prev;
  let energy = 0;

  // 🔹 Tamil Nadu Domestic Tariff Slabs (after subsidy)
  if (units <= 100) {
    energy = 0; // Free up to 100 units
  } else if (units <= 200) {
    energy = (units - 100) * 2.35;
  } else if (units <= 400) {
    energy = (100 * 2.35) + (units - 200) * 4.70;
  } else if (units <= 500) {
    energy = (100 * 2.35) + (200 * 4.70) + (units - 400) * 6.30;
  } else if (units <= 600) {
    energy = (100 * 2.35) + (200 * 4.70) + (100 * 6.30) + (units - 500) * 8.40;
  } else if (units <= 800) {
    energy = (100 * 2.35) + (200 * 4.70) + (100 * 6.30) + (100 * 8.40) + (units - 600) * 9.45;
  } else if (units <= 1000) {
    energy = (100 * 2.35) + (200 * 4.70) + (100 * 6.30) + (100 * 8.40) + (200 * 9.45) + (units - 800) * 10.50;
  } else {
    energy = (100 * 2.35) + (200 * 4.70) + (100 * 6.30) + (100 * 8.40) + (200 * 9.45) + (200 * 10.50) + (units - 1000) * 11.55;
  }

  const total = energy + fixed;

  $("outName").textContent = name ? "Customer: " + name : "";
  $("units").textContent = units.toString();
  $("energy").textContent = energy.toFixed(2);
  $("fixedOut").textContent = fixed.toFixed(2);
  $("total").textContent = total.toFixed(2);
  $("out").style.display = "block";
});

$("billForm").addEventListener("reset", () => {
  $("err").textContent = "";
  $("out").style.display = "none";
});

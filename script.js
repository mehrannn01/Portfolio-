// 1. Fill the skill bars when they scroll into view.
var bars = document.querySelectorAll(".bar span");
function fill(bar) { bar.style.width = bar.dataset.level + "%"; }

if ("IntersectionObserver" in window) {
  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        fill(entry.target);
        watcher.unobserve(entry.target);
      }
    });
  });
  bars.forEach(function (bar) { watcher.observe(bar); });
} else {
  bars.forEach(fill);
}

// 2. Copy the email address when the Copy button is clicked.
var copyBtn = document.getElementById("copy");
if (copyBtn) {
  copyBtn.addEventListener("click", function () {
    var email = document.getElementById("mail").textContent.trim();
    function done() {
      copyBtn.textContent = "Copied!";
      setTimeout(function () { copyBtn.textContent = "Copy"; }, 1800);
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(done);
    } else {
      var box = document.createElement("textarea");
      box.value = email;
      document.body.appendChild(box);
      box.select();
      document.execCommand("copy");
      document.body.removeChild(box);
      done();
    }
  });
}

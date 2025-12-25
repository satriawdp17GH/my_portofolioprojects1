// Loading Screen Animation
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const counter = document.getElementById("counter");
  const progressBar = document.getElementById("progressBar");

  let count = 0;
  const interval = setInterval(() => {
    count++;
    counter.textContent = count;
    progressBar.style.width = count + "%";

    if (count === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("fade-out");
        setTimeout(() => {
          loader.style.display = "none";
          mainContent.classList.add("show");
          // Start typing animation after loading
          startTypingAnimation();
        }, 500);
      }, 300);
    }
  }, 20);
});

// Typing Animation for Hero Section
function startTypingAnimation() {
  const text = "Halo, Saya Satria Wijaya Dwi Prayogo - Web Developer.";
  const typingElement = document.getElementById("typingText");
  const cursor = document.querySelector(".cursor");
  let index = 0;

  // Clear any existing text
  typingElement.textContent = "";

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    } else {
      // Keep cursor blinking after typing
      setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
      }, 500);
    }
  }

  type();
}

// Statistics Counter Animation
function animateCounter() {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200;

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = target / speed;

    const updateCount = () => {
      const count = +counter.innerText;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Intersection Observer for Stats Animation
const statsSection = document.querySelector(".stats-section");
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

if (statsSection) {
  observer.observe(statsSection);
}

// Project Filter Functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter projects
    projectItems.forEach((item) => {
      const category = item.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 10);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
    navbar.style.boxShadow = "0 4px 30px rgba(79, 172, 254, 0.3)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
    navbar.style.boxShadow = "0 4px 30px rgba(79, 172, 254, 0.2)";
  }
});

// Add animation to elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".skill-card, .achievement-card, .project-card, .cv-card"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Set initial state for animated elements
document
  .querySelectorAll(".skill-card, .achievement-card, .project-card, .cv-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
  });

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Initialize animations on page load
window.addEventListener("load", function () {
  animateOnScroll();
});

// ========================================
// CV DOWNLOAD FUNCTIONALITY
// ========================================

// Track CV Downloads
document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.getElementById("downloadCvBtn");
  const viewBtn = document.getElementById("viewCvBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      console.log("CV Download initiated");

      // Optional: Show download status
      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i><span>Downloading...</span>';
      this.classList.add("downloading");

      // Reset button after 2 seconds
      setTimeout(() => {
        this.innerHTML =
          '<i class="fas fa-download"></i><span>Download CV</span>';
        this.classList.remove("downloading");

        // Show success message
        showDownloadSuccess();
      }, 2000);
    });
  }

  if (viewBtn) {
    viewBtn.addEventListener("click", function (e) {
      console.log("CV Preview opened in new tab");
    });
  }
});

// Show download success notification
function showDownloadSuccess() {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "download-notification";
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-check-circle"></i>
      <span>CV berhasil diunduh! Periksa folder Downloads Anda.</span>
    </div>
  `;

  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #00f2fe, #4facfe);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(79, 172, 254, 0.5);
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
    font-weight: 500;
  `;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add animation for notification
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .btn-download.downloading {
    background: linear-gradient(135deg, #00b894, #00f2fe);
    pointer-events: none;
  }
  
  .btn-download.downloading:hover {
    transform: none;
  }
`;
document.head.appendChild(style);

// ========================================
// FIX FOR CV DOWNLOAD ON LOCAL FILESYSTEM
// ========================================

// Alternative download method for local files
function forceDownload(url, filename) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error("Download error:", error);
      // Fallback to regular download
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
}

// Enhanced download handler
document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.getElementById("downloadCvBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default behavior

      const originalHtml = this.innerHTML;
      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i><span>Downloading...</span>';
      this.classList.add("downloading");

      const pdfUrl = this.getAttribute("href");
      const filename = this.getAttribute("download");

      // Try both methods
      try {
        // Method 1: Direct download
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Method 2: Fallback with timeout
        setTimeout(() => {
          forceDownload(pdfUrl, filename);
        }, 100);
      } catch (error) {
        console.error("Download failed:", error);
      }

      // Reset button and show notification
      setTimeout(() => {
        this.innerHTML = originalHtml;
        this.classList.remove("downloading");
        showDownloadSuccess();
      }, 2000);
    });
  }
});

// Enhanced notification function
function showDownloadSuccess() {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(
    ".download-notification"
  );
  existingNotifications.forEach((notification) => notification.remove());

  // Create new notification
  const notification = document.createElement("div");
  notification.className = "download-notification";
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-check-circle" style="margin-right: 10px; font-size: 20px;"></i>
      <span>CV berhasil diunduh! Periksa folder Downloads Anda.</span>
      <button class="notification-close" style="margin-left: 15px; background: none; border: none; color: white; cursor: pointer;">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #00f2fe, #4facfe);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(79, 172, 254, 0.5);
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
    font-weight: 500;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  // Add close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

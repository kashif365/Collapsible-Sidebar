
      const sidebar = document.getElementById("sidebar");
      const mobileToggleBtn = document.getElementById("mobileToggleBtn");
      const sidebarOverlay = document.getElementById("sidebarOverlay");

      // Function to toggle sidebar
      function toggleSidebar() {
        sidebar.classList.toggle("open");
        sidebarOverlay.classList.toggle("active");

        // Change icon based on state
        const icon = mobileToggleBtn.querySelector("i");
        if (sidebar.classList.contains("open")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }

      // Event listener for toggle button
      mobileToggleBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent event from bubbling to document
        toggleSidebar();
      });

      // Close sidebar when clicking outside on mobile
      document.addEventListener("click", function (e) {
        if (
          window.innerWidth <= 992 &&
          !sidebar.contains(e.target) &&
          e.target !== mobileToggleBtn
        ) {
          sidebar.classList.remove("open");
          sidebarOverlay.classList.remove("active");
          const icon = mobileToggleBtn.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });

      // Close sidebar when clicking on overlay
      sidebarOverlay.addEventListener("click", function () {
        toggleSidebar();
      });

      // Close sidebar when clicking on nav items on mobile
      const navItems = document.querySelectorAll(".nav-item");
      navItems.forEach((item) => {
        item.addEventListener("click", function () {
          if (window.innerWidth <= 992) {
            toggleSidebar();
          }
          navItems.forEach((i) => i.classList.remove("active"));
          this.classList.add("active");
        });
      });

      // Handle window resize
      window.addEventListener("resize", function () {
        if (window.innerWidth > 992) {
          sidebar.classList.remove("open");
          sidebarOverlay.classList.remove("active");
          const icon = mobileToggleBtn.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
      document.addEventListener("DOMContentLoaded", function () {
        const navItems = document.querySelectorAll(".nav-item");

        navItems.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();

            // Remove active class from all nav items and tab contents
            navItems.forEach((nav) => nav.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach((tab) => {
              tab.classList.remove("active");
            });

            // Add active class to clicked nav item
            this.classList.add("active");

            // Show corresponding tab content
            const tabId = this.getAttribute("data-tab") + "-tab";
            document.getElementById(tabId).classList.add("active");
          });
        });
      });
      document
        .getElementById("profileForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          // Get input values
          const firstName = document.getElementById("firstName").value.trim();
          const lastName = document.getElementById("lastName").value.trim();

          // Generate initials
          let initials = "";
          if (firstName) initials += firstName[0].toUpperCase();
          if (lastName) initials += lastName[0].toUpperCase();

          // Update avatar
          if (initials) {
            document.getElementById("userAvatar").textContent = initials;

            // Store in localStorage to persist across page refreshes
            localStorage.setItem("userInitials", initials);
            localStorage.setItem("userFirstName", firstName);
            localStorage.setItem("userLastName", lastName);

            // Show success message
            alert("Profile updated successfully!");
          }
        });

      // Load saved initials on page load
      document.addEventListener("DOMContentLoaded", function () {
        const savedInitials = localStorage.getItem("userInitials");
        if (savedInitials) {
          document.getElementById("userAvatar").textContent = savedInitials;
        }

        // Optional: Pre-fill the form with saved names
        const savedFirstName = localStorage.getItem("userFirstName");
        const savedLastName = localStorage.getItem("userLastName");
        if (savedFirstName)
          document.getElementById("firstName").value = savedFirstName;
        if (savedLastName)
          document.getElementById("lastName").value = savedLastName;
      });
      // Function to update name everywhere
      function updateUserProfile(firstName, lastName) {
        const fullName = `${firstName} ${lastName}`;
        const initials = (firstName[0] + lastName[0]).toUpperCase();

        // Update header avatar
        document.getElementById("userAvatar").textContent = initials;

        // Update message sender name
        document.getElementById("currentUserName").textContent = fullName;

        // Update team member profile
        document.getElementById("teamUserName").textContent = fullName;
        document.getElementById("teamUserAvatar").textContent = initials;

        // Store in localStorage
        localStorage.setItem("userInitials", initials);
        localStorage.setItem("userFullName", fullName);
        localStorage.setItem("userFirstName", firstName);
        localStorage.setItem("userLastName", lastName);
      }

      // Form submission handler
      document
        .getElementById("profileForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          const firstName = document.getElementById("firstName").value.trim();
          const lastName = document.getElementById("lastName").value.trim();

          if (firstName && lastName) {
            updateUserProfile(firstName, lastName);
            alert("Profile updated successfully!");
          } else {
            alert("Please enter both first and last name");
          }
        });

      // Load saved data on page load
      document.addEventListener("DOMContentLoaded", function () {
        const savedFirstName = localStorage.getItem("userFirstName") || "John";
        const savedLastName = localStorage.getItem("userLastName") || "Doe";

        // Update form fields
        document.getElementById("firstName").value = savedFirstName;
        document.getElementById("lastName").value = savedLastName;

        // Update all name displays
        updateUserProfile(savedFirstName, savedLastName);
      });
    
<template>
  <footer>
    <div class="footer-logo flex direction-col align-center">
      <p>&copy; BitCoin Wallet by Michael Uzan</p>
      <img src="../assets/img/logo-spinning.gif" />
    </div>
    <div class="footer-desc">
      <p>Frontend Vue Project - Online money transfer app inspired by Bit</p>
      <ul class="social-links clean-list flex direction-row justify-center">
        <li>
          <a target="_blank" href="https://github.com/Michael-Uzan">
            <img src="../assets/img/github-logo.png" />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/michael-uzan-ab637071/"
          >
            <img src="../assets/img/linkedin-logo.png" />
          </a>
        </li>
      </ul>
    </div>
    <div class="bottom-footer"></div>
  </footer>
</template>

<script>
export default {
  name: "AppFotter",
};
</script>
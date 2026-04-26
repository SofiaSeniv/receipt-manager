function renderHeader() {
  const header = document.getElementById('site-header');
  header.innerHTML = `
    <a href="index.html" class="logo">Mise <span>en Place</span> </a>
    <nav>
        <ul>
            <li><a href="index.html">Vault</a></li>
            <li><a href="#">Planner</a></li>
            <li><a href="#">Techniques</a></li>
        </ul>
    </nav>
  `;
}

renderHeader();
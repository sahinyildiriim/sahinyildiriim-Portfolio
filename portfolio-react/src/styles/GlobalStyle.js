import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #00A8FF;
    --secondary-color: #FF6B6B;
    --accent-color: #7E57C2;
    --bg-primary: #0c1421;
    --bg-secondary: #1e2f4c;
    --text-primary: #FFFFFF;
    --text-secondary: #B0B8C4;
    --text-accent: #6C8EFF;
    --text-heading: #F2F5F9;
    --success-color: #4CD964;
    --danger-color: #FC3850;
    --border-radius: 12px;
    --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    --container-width: 1200px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: var(--text-accent);
    transition: var(--transition);
  }

  a:hover {
    color: var(--secondary-color);
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button, .button {
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--text-primary);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
    transition: var(--transition);
    box-shadow: 0 4px 15px rgba(0, 168, 255, 0.4);
  }

  button:hover, .button:hover {
    background-color: #0091e0;
    transform: translateY(-3px);
    box-shadow: 0 7px 18px rgba(0, 168, 255, 0.5);
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-heading);
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 3.5rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.8;
  }

  .container {
    width: 100%;
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  section {
    padding: 5rem 0;
  }

  .section-title {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .section-title:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    border-radius: 2px;
  }

  /* For responsive layout */
  @media (max-width: 992px) {
    h1 { font-size: 3rem; }
    h2 { font-size: 2.2rem; }
    h3 { font-size: 1.5rem; }
  }

  @media (max-width: 768px) {
    h1 { font-size: 2.5rem; }
    h2 { font-size: 1.9rem; }
    section { padding: 4rem 0; }
  }

  @media (max-width: 576px) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1.7rem; }
    section { padding: 3rem 0; }
  }
`;

export default GlobalStyle; 
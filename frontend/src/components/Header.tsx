import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <div className="container header-content">
        <h1 className="logo">Solar Quote Platform</h1>
        <nav>
          <Link to="/">Get Quote</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
import Link from "next/link"

export default function Layout({ children }) {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <Link href="/" className="logo">
              BlogSite
            </Link>
            <ul className="nav-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/admin">Admin</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">{children}</div>
      </main>
    </>
  )
}

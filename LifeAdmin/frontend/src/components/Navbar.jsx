import { useNavigate } from 'react-router-dom'

function Navbar({ userName }) {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('lifeadmin_token')
    localStorage.removeItem('lifeadmin_user')
    navigate('/login', { replace: true })
  }

  return (
    <header className="navbar">
      <h1 className="navbar-title">Dashboard</h1>
      <div className="navbar-user">
        <span>Hi, {userName || 'there'}</span>
        <button className="btn-secondary" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  )
}

export default Navbar

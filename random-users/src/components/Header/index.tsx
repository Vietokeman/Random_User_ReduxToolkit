import logo from "../../assets/y-nghia-logo-fpt-lan-3.jpg";
import "./Header.scss";
function Header() {
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <div className="logo">
              <img
                style={{ width: "60px", marginRight: "10px" }}
                src={logo}
                alt="logo FPT"
              />
            </div>
          </div>

          <div className="header-right">
            <div className="language">
              <span>English</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;

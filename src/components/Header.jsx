import Logo from "../assets/logomark.svg"

const Header = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-center w-full gap-9 mt-6">
        <img alt='Logo' src={Logo} className="w-20 h-20" />
        <h1 className="font-bold text-[40px] leading-normal">HomeBugdet</h1>
      </div>
    </div>
  )
}

export default Header;

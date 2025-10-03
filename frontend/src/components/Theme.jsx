function Theme({ curTheme, setCurTheme }) {
  function changeTheme() {
    setCurTheme(!curTheme);
  }
  return (
    <div>
      <button className="mode-btn" onClick={changeTheme}>
        {curTheme ? "🌕" : "🌑"}
      </button>
    </div>
  );
}


export default Theme;
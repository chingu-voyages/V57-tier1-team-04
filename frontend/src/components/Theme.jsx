function Theme({ curTheme, setCurTheme }) {
  function changeTheme() {
    setCurTheme(!curTheme);
  }
  return (
    <div>
      <button 
       className="mode-btn" 
       onClick={changeTheme}
       aria-label={`Switch to ${curTheme ? 'Light' : 'Dark'} Theme`}
       aria-pressed={curTheme}
       >
        <span aria-hidden="true">

        {curTheme ? "🌕" : "🌑"}
        </span>
      </button>
    </div>
  );
}


export default Theme;
const Button = ({ handleClick, btnName, classStyles }) => {
    
  return (
    <button
      type='button'
      className={`text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold ${classStyles}`}
      onClick={handleClick}
    >
        {btnName}
    </button>
  )
}

export default Button
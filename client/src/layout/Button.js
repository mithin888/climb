
const Button = props => {

  return (
    <button
      onClick={props.onClick}
      className="w-28 px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm">{props.children}</button>
  );
};

export default Button;